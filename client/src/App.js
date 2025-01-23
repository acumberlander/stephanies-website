import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./utils/initializeApp";
import { fetchAllProducts } from "./store/productThunks/productThunks";
import {
  MyNavbar,
  Footer,
  About,
  Cart,
  Checkout,
  Home,
  Shop,
  ProductDetails,
} from "./components";
import ThankYou from "./Pages/ThankYouPage/ThankYou";
import "./App.scss";

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);

  useEffect(() => {
    if (!uid) {
      initializeApp(dispatch);
    }
  }, [uid, dispatch]);

  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout error={errorMessage} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
