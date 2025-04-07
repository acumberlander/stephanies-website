import React, { useEffect, Suspense, lazy, useRef } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { initializeApp } from "./utils/initializeApp";
import { MainLayout, LoadingPage, Home } from "./components";
import { useModal } from "./context/ModalContext";
import { ErrorBoundary } from "react-error-boundary";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import "./App.scss";

const App = () => {
  const dispatch = useDispatch();
  const { uid } = useSelector((state) => state.user);
  const uidRef = useRef(uid);
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
  const OrdersPage = lazy(() => import("./Pages/OrdersPage/OrdersPage"));

  useEffect(() => {
    initializeApp(dispatch);
  }, [dispatch]);

  useEffect(() => {
    if (uidRef.current === null && uid !== null) {
      closeModal();
    }
    uidRef.current = uid;
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
              <Route path="/orders" element={<OrdersPage />} />
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
