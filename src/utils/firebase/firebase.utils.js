import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore'

const firebaseConfig = {

    apiKey: "AIzaSyBRWojBeJQIbfZZjOJVj4j6ujat6eAX1M0",
  
    authDomain: "superdrip.firebaseapp.com",
  
    projectId: "superdrip",
  
    storageBucket: "superdrip.appspot.com",
  
    messagingSenderId: "671228750610",
  
    appId: "1:671228750610:web:5b70ed165faa3f94efe1cb"
  
  };

  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    promt : "select_account"
});

export const auth = getAuth();

export const signInWithGooglePopup = ()=> signInWithPopup(auth,provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async(userAuth, additionalInfo={})=>{
    if(!userAuth){
        return;
    }
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    console.log(userSnapshot);


    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo
            })
        }catch(error){
            console.log(error);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password){
        return;
    }
    
    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInUserWithEmailAndPassword = async (email, password)=>{
    if(!email || !password){
        return;
    }
    
    return await signInWithEmailAndPassword(auth,email,password);
}

export const signOutUser = async ()=>{
    await signOut(auth)
}