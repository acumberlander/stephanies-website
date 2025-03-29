import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./utils/initializeApp";
import { ToastContainer } from "react-toastify";
import {
  MyNavbar,
  Footer,
  About,
  Cart,
  Home,
  Shop,
  ProductDetails,
  ErrorPage,
  AuthModal,
  CheckoutPage,
  AdminPage,
} from "./components";
import ThankYou from "./Pages/ThankYouPage/ThankYou";
import { useIsMobile, useModal } from "./hooks/hooks";
import "./App.scss";

const App = () => {
  const { isOpen, openModal, closeModal } = useModal();
  const dispatch = useDispatch();
  const { isMobile } = useIsMobile();
  const { uid, isAdmin } = useSelector((state) => state.user);
  const onAdminPage = window.location.pathname === "/admin";

  useEffect(() => {
    if (!uid) {
      initializeApp(dispatch);
    }
    if (uid !== null) {
      closeModal();
    }
  }, [uid, dispatch]);

  return (
    <Router>
      <MyNavbar openModal={openModal} />
      <AuthModal isOpen={isOpen} closeModal={closeModal} />
      {isMobile ? null : (
        <ToastContainer
          position="top-right"
          autoClose={1500}
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
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      {onAdminPage ? null : <Footer />}
    </Router>
  );
};

export default App;
