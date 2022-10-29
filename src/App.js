import React from "react";
import "./App.scss";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Shop } from "./pages/shop/Shop";
import { Auth } from "./pages/auth/Auth";
import { Checkout } from "./pages/checkout/Checkout";
import { createContext, useState, useEffect, useReducer } from "react";
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
  getCategoriesAndDocuments,
} from "./utils/firebase/firebase.utils";
import { createAction } from "./utils/reducer/reducer.utils";
import { Elements } from "@stripe/react-stripe-js";
import { stripePromise } from "./utils/stripe/stripe.utils";

export const AppContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

export const CategoriesContext = createContext({
  categoriesMap: {},
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
const removeCartItem = (cartItems, productTorRemove) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productTorRemove.id
  );

  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== productTorRemove.id);
  }
  return cartItems.map((cartItem) =>
    cartItem.id === productTorRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};
const clearCartItem = (cartItems, productTorRemove) => {
  return cartItems.filter((cartItem) => cartItem.id !== productTorRemove.id);
};
export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});
const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload,
      };
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [categoriesMap, setCategoriesMap] = useState({});

  const [{ cartCount, cartItems, isCartOpen, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(categoryMap);
    };
    getCategories();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) {
        createUserDocumentFromAuth(user);
      }
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const UpdateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      }) 
    );
  };
  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    UpdateCartItemsReducer(newCartItems);
  };
  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    UpdateCartItemsReducer(newCartItems);
  };
  const clearItemFromCart = (product) => {
    const newCartItems = clearCartItem(cartItems, product);
    UpdateCartItemsReducer(newCartItems);
  };

  const setIsCartOpen = (bool) => {
    dispatch(
      createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool)
    );
  };

  const value = { currentUser, setCurrentUser };
  const p_value = { categoriesMap, setCategoriesMap };

  const c_value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemFromCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return (
    <>
      <AppContext.Provider value={value}>
        <CategoriesContext.Provider value={p_value}>
          <CartContext.Provider value={c_value}>
            <Elements stripe={stripePromise}>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop/*" element={<Shop />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/*" element={<div>Page does not exist</div>} />
              </Routes>
            </Elements>
          </CartContext.Provider>
        </CategoriesContext.Provider>
      </AppContext.Provider>
    </>
  );
}

export default App;
