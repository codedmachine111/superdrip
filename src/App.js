import React from "react";
import "./App.scss";
import { Home } from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import { Shop } from "./pages/shop/Shop";
import { Auth } from "./pages/auth/Auth";
import { createContext, useState } from "react";

export const AppContext = createContext({
  setCurrentUser: () => null,
  currentUser: null,
});

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  return (
    <>
      <AppContext.Provider value={value}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/*" element={<div>Page does not exist</div>} />
        </Routes>
      </AppContext.Provider>
    </>
  );
}

export default App; 