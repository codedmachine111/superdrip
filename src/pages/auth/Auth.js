import "./Auth.scss";
import { SignupForm } from "../../components/SignupForm/SignupForm";
import { SigninForm } from "../../components/SigninForm/SigninForm";

export const Auth = () => {
  return (
    <>
      <div className="auth-container">
        <div className="sign-in-container">
          <div className="options">
          <h2>Already have an account?</h2>
            <p>Sign in with email and password.</p>
            </div>
            
          <SigninForm />
        </div>
        <div className="sign-up-container">
            <h2>Dont have an account?</h2>
            <p>Sign up with email and password.</p>
          <div className="options">
            
            </div>
          <SignupForm />
        </div>
      </div>
    </>
  );
};
