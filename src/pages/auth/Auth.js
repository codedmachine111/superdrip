import './Auth.css'
import {
    signInWithGooglePopup,
    createUserDocumentFromAuth
} from '../../utils/firebase/firebase.utils'

export const Auth =()=>{
    
    const logGoogleUser = async()=>{
        
        const {user} =  await signInWithGooglePopup();
        const userDocRef = await createUserDocumentFromAuth(user)
    }
    return (
        <>
            <div className="auth-container">
                    Auth
                    <button onClick={logGoogleUser}>Sign-in with google</button>
            </div>
        </>
    )
}