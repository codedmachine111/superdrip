import React from "react";
import "./App.scss";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Shop } from "./pages/shop/Shop";
import { Auth } from "./pages/auth/Auth";
import { Checkout } from "./pages/checkout/Checkout";
import { useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCategoriesAndDocuments,
} from "./utils/firebase/firebase.utils";
import { createAction } from "./utils/reducer/reducer.utils";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";
import { useDispatch } from "react-redux";
import { createContext, useState } from "react";

import { CATEGORIES_ACTION_TYPES } from "./store/categories/categories.types";

export const ToggleCartContext = createContext({
  isCartOpen: false,
});

// ACTION TYPES FOR USER REDUCER
const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};

function App() {
  // DISPATCH FOR REDUX
  const dispatch = useDispatch();

  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // SET CURRENT USER USING DISPATCH
  const setCurrentUser = (user) => {
    dispatch(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
  };
  // SET CATEGORIES MAP
 const setCategoriesMap = (categoriesMap) => {
  dispatch(createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesMap));
};


  // CREATE USER DOCUMENT IN FIRESTORE AND SET CURRENT USER
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);


  // FOR FETCHING CATEGORIES AND DOCUMENTS FROM FIRESTORE
  // AND SETTING THEM IN REDUX
  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(categoryMap);
    };
    getCategories();
  }, []);

  return (
    <>
      <Elements stripe={stripePromise}>
        <ToggleCartContext.Provider value={{ isCartOpen, setIsCartOpen }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop/*" element={<Shop />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/*" element={<div>Page does not exist</div>} />
          </Routes>
        </ToggleCartContext.Provider>
      </Elements>
    </>
  );
}

export default App;
