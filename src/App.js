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
import { useDispatch } from "react-redux";

// SETTING UP USER CONTEXT AND REDUCER
export const AppContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});
// ACTION TYPES FOR USER REDUCER
export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: "SET_CURRENT_USER",
};
// INITIAL STATE FOR USER REDUCER
const USER_INITIAL_STATE = {
  currentUser: null,
};
// USER REDUCER
const userReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case USER_ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    default:
      throw new Error(`Unhandled action type: ${type}`);
  }
};

// SETTING UP CATGEORIES CONTEXT AND REDUCER
export const CategoriesContext = createContext({
  categoriesMap: {},
});

// FUNCTIONS TO HANDLE CART ITEMS
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

// SETTING UP CART CONTEXT AND REDUCER
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
// ACTION TYPES FOR CART REDUCER
const CART_ACTION_TYPES = {
  SET_CART_ITEMS: "SET_CART_ITEMS",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
};
// INITIAL STATE FOR CART REDUCER
const CART_INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0,
};
// CART REDUCER
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
  const [categoriesMap, setCategoriesMap] = useState({});

  // DISPATCH FOR REDUX
  const dis = useDispatch();

  // INITIALIZE CART REDUCER
  const [{ cartCount, cartItems, isCartOpen, cartTotal }, cartDispatch] =
    useReducer(cartReducer, CART_INITIAL_STATE);

  // INITIALIZE USER REDUCER
  const [{ currentUser }] = useReducer(userReducer, USER_INITIAL_STATE);

  // SET CURRENT USER USING DISPATCH
  const setCurrentUser = (user) => {
    dis(createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user));
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

  // FOR CATEGORIES
  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = await getCategoriesAndDocuments("categories");
      setCategoriesMap(categoryMap);
    };
    getCategories();
  }, []);

  // HANDLE CART ITEMS USING REDUCER
  const UpdateCartItemsReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
    cartDispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEMS, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };
  // FUNCTIONS TO HANDLE UPDATE CART ITEMS USING REDUCER
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
    cartDispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, bool));
  };

  // VALUES FOR CONTEXT
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
