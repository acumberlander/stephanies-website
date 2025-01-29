import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./utils/initializeApp";
import { ToastContainer } from "react-toastify";
import { useIsMobile, useModal } from "./hooks/hooks";
import {
  MyNavbar,
  Footer,
  AuthModal,
  About,
  Cart,
  Checkout,
  Home,
  Shop,
  ProductDetails,
  ErrorPage,
  ThankYou,
} from "./components";
import "./App.scss";
import AdminPortal from "./Pages/AdminPortal/AdminPortal";

const App = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const { uid } = useSelector((state) => state.user);
  const { isMobile } = useIsMobile();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!uid) {
      initializeApp(dispatch);
    }
  }, [uid, dispatch]);

  return (
    <Router>
      <MyNavbar openModal={openModal} />
      <AuthModal isOpen={isOpen} closeModal={closeModal} />
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
          style={{
            marginTop: "60px",
            maxHeight: "40px",
            zIndex: "1",
          }}
          stacked
        />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="/admin" element={<AdminPortal />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
