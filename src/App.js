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

export const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  cartCount: 0
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(()=>{
    const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  },[cartItems])

  const addItemToCart  = (product)=>{
    setCartItems(addCartItem(cartItems, product));
  }
  const value = { currentUser, setCurrentUser };
  const p_value = { products, setProducts };
  const c_value = { isCartOpen, setIsCartOpen, addItemToCart , cartItems, cartCount,setCartCount};

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
          <CartContext.Provider value={c_value}>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/*" element={<div>Page does not exist</div>} />
            </Routes>
          </CartContext.Provider>
        </ProductContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
