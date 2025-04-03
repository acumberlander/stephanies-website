import React, { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./utils/initializeApp";
import { MainLayout, LoadingPage, Home } from "./components";
import { useModal } from "./hooks/hooks";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  const { closeModal } = useModal();

  // Lazy Loaded Pages
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
  const AccountSettings = lazy(() => import("./Pages/AccountPage/AccountSettings"));

  useEffect(() => {
    initializeApp(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (uid !== null) {
      closeModal();
    }
  }, [uid, closeModal]);

  return (
    <ErrorBoundary
      FallbackComponent={ErrorPage}
      onReset={() => window.location.reload()}
    >
      <Suspense fallback={<LoadingPage />}>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute requireAdmin={true}>
                    <AdminPage />
                  </ProtectedRoute>
                } 
              />
              <Route path="/about" element={<About />} />
              <Route path="/shop/:category" element={<Shop />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/thank-you" element={<ThankYou />} />
              <Route 
                path="/account" 
                element={
                  <ProtectedRoute>
                    <AccountSettings />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<ErrorPage />} />
            </Routes>
          </MainLayout>
        </Router>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
