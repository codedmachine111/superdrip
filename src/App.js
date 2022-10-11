import React from "react";
import "./App.scss";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Shop } from "./pages/shop/Shop";
import { Auth } from "./pages/auth/Auth";
import { Checkout } from "./pages/checkout/Checkout";
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
const removeCartItem = (cartItems, productTorRemove)=>{
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productTorRemove.id)

  if(existingCartItem.quantity === 1){
    return cartItems.filter((cartItem)=> cartItem.id !== productTorRemove.id)
  }
  return cartItems.map((cartItem)=> cartItem.id === productTorRemove.id ? {...cartItem, quantity: cartItem.quantity - 1} : cartItem)
}
const clearCartItem = (cartItems, productTorRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productTorRemove.id);
}
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [products, setProducts] = useState(PRODUCTS);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  useEffect(()=>{
    const newCartCount = cartItems.reduce((total, cartItem)=> total + cartItem.quantity, 0);
    setCartCount(newCartCount);
  },[cartItems])

  useEffect(()=>{
    const newCartTotal= cartItems.reduce((total, cartItem)=> total + cartItem.price * cartItem.quantity, 0);
    setCartTotal(newCartTotal);
  },[cartItems])

  const addItemToCart  = (product)=>{
    setCartItems(addCartItem(cartItems, product));
  }
  const removeItemFromCart = (product)=>{
    setCartItems(removeCartItem(cartItems, product));
  }
  const clearItemFromCart = (product)=>{
    setCartItems(clearCartItem(cartItems, product));
  }
  const value = { currentUser, setCurrentUser };
  const p_value = { products, setProducts };
  const c_value = { isCartOpen, setIsCartOpen, addItemToCart , removeItemFromCart,clearItemFromCart, cartItems, cartCount,setCartCount, cartTotal, setCartTotal};

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
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/*" element={<div>Page does not exist</div>} />
            </Routes>
          </CartContext.Provider>
        </ProductContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
