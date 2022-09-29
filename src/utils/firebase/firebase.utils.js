import { initializeApp } from "firebase/app";
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
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

export const createUserDocumentFromAuth = async(userAuth)=>{
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
                createdAt
            })
        }catch(error){
            console.log(error);
        }
    }

    return userDocRef;
}