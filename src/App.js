import React from "react";
import "./App.scss";
import { Home } from "./pages/home/Home";
import {Routes, Route} from "react-router-dom"
import { Navbar } from "./components/Navbar/Navbar";
import {Shop} from './pages/shop/Shop'
import {Auth} from './pages/auth/Auth'
function App() {

  return (
    <>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/shop" element={<Shop/>} />
          <Route path="/auth" element={<Auth/>} />
          <Route path="/*" element={<div>Page does not exist</div>} />
        </Routes>      
    </>
  );
}

export default App;
