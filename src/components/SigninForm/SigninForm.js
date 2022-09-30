import "./SigninForm.scss";
import React from "react";
import { useState } from "react";
import { Button } from ".././Button/Button";
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
const defaultFormFields = {
  email: "",
  password: "",
};

export const SigninForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleOnSubmit = async(e) => {
    e.preventDefault();
    try{
        const res = await signInUserWithEmailAndPassword(email,password);
        console.log(res);
        resetFormFields();
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

  const logGoogleUser = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentFromAuth(user);
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
          <Button title="Sign-In with google" onClick={logGoogleUser} id="google" type="button"/>
        </div>
      </form>
    </>
  );
};
