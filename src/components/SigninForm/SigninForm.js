import "./SigninForm.scss";
import React from "react";
import { useState } from "react";
import { Button } from ".././Button/Button";
import {
  signInWithGooglePopup,
  signInUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import { useNavigate } from "react-router-dom";

const defaultFormFields = {
  email: "",
  password: "",
};

export const SigninForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try{
        await signInUserWithEmailAndPassword(email,password);
        alert("User signed in successfully!")
        resetFormFields();
        navigate("/");
    }catch(error){
        switch(error.code){
            case 'auth/wrong-password':
                alert("Wrong password!");
                break;
            case 'auth/user-not-found':
                alert("No user associated with this email");
                break;
            default:
                console.log(error);
        }
    }
  };

  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  const signInWithGoogle = async () => {
    try{
      await signInWithGooglePopup();
      alert("User signed in successfully!");
    }catch(error){
      console.log(error);
    }
  };

  return (
    <>
      <form className="sign-in" onSubmit={handleOnSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          id="email"
          required
          onChange={handleOnChange}
          value={email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          onChange={handleOnChange}
          value={password}
        />
        <div className="buttons">
          <Button title="Sign-In" onSubmit={handleOnSubmit} type="submit"/>
          <Button title="Sign-In with google" onClick={signInWithGoogle} id="google" type="button"/>
        </div>
      </form>
    </>
  );
};
