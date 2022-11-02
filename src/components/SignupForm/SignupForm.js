import "./SignupForm.scss";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils";
import { Button } from "../Button/Button";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const SignupForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const navigate = useNavigate();
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
      alert("Account created successfully!");
      await createUserDocumentFromAuth(user, { displayName });
      resetFormFields();
      navigate("/");
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
        <input
          type="text"
          name="displayName"
          placeholder="Username"
          required
          onChange={handleOnChange}
          value={displayName}
        />
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
          onChange={handleOnChange}
          value={confirmPassword}
        />
        <Button title="Sign-Up" onSubmit={handleOnSubmit}/>
      </form>
    </>
  );
};
