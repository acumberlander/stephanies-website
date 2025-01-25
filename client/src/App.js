import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./utils/initializeApp";
import { ToastContainer } from "react-toastify";
import {
  MyNavbar,
  Footer,
  About,
  Cart,
  Checkout,
  Home,
  Shop,
  ProductDetails,
  ErrorPage,
} from "./components";
import ThankYou from "./Pages/ThankYouPage/ThankYou";
import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const [isMobile, setIsMobile] = useState(false);
  const { uid } = useSelector((state) => state.user);

  useEffect(() => {
    if (!uid) {
      initializeApp(dispatch);
    }
    const setResponsiveness = () => {
      return window.innerWidth < 900 ? setIsMobile(true) : setIsMobile(false);
    };
    setResponsiveness();
    window.addEventListener("resize", () => setResponsiveness());
  }, [uid, dispatch]);

  return (
    <Router>
      <MyNavbar isMobile={isMobile} />
      {isMobile ? null : (
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          style={{ marginTop: "60px" }}
          stacked
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout isMobile={isMobile} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
