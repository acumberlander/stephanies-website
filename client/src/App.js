import React, { useEffect, Suspense, lazy, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./utils/initializeApp";
import { ToastContainer } from "react-toastify";
import { MainLayout, LoadingPage, Footer } from "./components";
import { useIsMobile, useModal } from "./hooks/hooks";
import { ErrorBoundary } from "react-error-boundary";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const { isMobile } = useIsMobile();
  const { uid } = useSelector((state) => state.user);
  const { closeModal } = useModal();

  // Lazy Loaded Pages
  const Home = lazy(() => import("./Pages/HomePage/Home"));
  const Shop = lazy(() => import("./Pages/ShopPage/Shop"));
  const Cart = lazy(() => import("./Pages/CartPage/Cart"));
  const About = lazy(() => import("./Pages/AboutPage/About"));
  const ErrorPage = lazy(() => import("./Pages/ErrorPage/ErrorPage"));
  const ThankYou = lazy(() => import("./Pages/ThankYouPage/ThankYou"));
  const CheckoutPage = lazy(() => import("./Pages/CheckoutPage/CheckoutPage"));
  const AdminPage = lazy(() => import("./Pages/AdminPage/AdminPage"));
  const ProductDetails = lazy(() =>
    import("./Pages/ProductDetailsPage/ProductDetails")
  );

  useEffect(() => {
    if (uid === null) {
      initializeApp(dispatch);
    } else {
      closeModal();
    }
  }, [uid, dispatch, closeModal]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<LoadingPage />}>
        <Router>
          <MainLayout>
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
          </MainLayout>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
