import React from "react";
import "./App.scss";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Shop } from "./pages/shop/Shop";
import { Auth } from "./pages/auth/Auth";
import { createContext, useState, useEffect } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from "./utils/firebase/firebase.utils";
import PRODUCTS from "./shop-data/shop-data.json";

export const AppContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const ProductContext = createContext({
  products: [],
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);

  const value = { currentUser, setCurrentUser };
  const p_value = { products, setProducts};
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return (
    <>
      <AppContext.Provider value={value}>
        <ProductContext.Provider value={p_value}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/*" element={<div>Page does not exist</div>} />
          </Routes>
        </ProductContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
