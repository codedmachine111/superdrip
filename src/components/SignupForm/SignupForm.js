import "./SignupForm.scss";
import React from "react";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields=()=>{
      setFormFields(defaultFormFields);
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
    } catch (error) {
      if(error.code === 'auth/email-already-in-use'){
          alert("Email already in use.");
      }else{
          console.log(error);
      }
    }
  };
  const handleOnChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };
  return (
    <>
      <form className="sign-up" onSubmit={handleOnSubmit}>
        <h2>Sign-up with email and password</h2>
        <p>Name</p>
        <input
          type="text"
          name="displayName"
          placeholder="john"
          required
          onChange={handleOnChange}
          value={displayName}
        />
        <p>Email</p>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          id="email"
          required
          onChange={handleOnChange}
          value={email}
        />
        <p>Password</p>
        <input
          type="password"
          name="password"
          placeholder="password"
          required
          onChange={handleOnChange}
          value={password}
        />
        <p>Confirm password</p>
        <input
          type="password"
          name="confirmPassword"
          placeholder="password"
          required
          onChange={handleOnChange}
          value={confirmPassword}
        />

        <input type="submit" className="btn-submit" value="Sign-Up" />
      </form>
    </>
  );
};
