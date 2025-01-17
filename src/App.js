import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MyNavbar,
  Footer,
  About,
  Cart,
  Checkout,
  Home,
  Shop,
  ProductDetails,
  Services,
} from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { fetchProducts } from "./actions/products";
import { fetchCart } from "./actions/cart";
// import { storageRef } from './photoData/firebaseConfig';

const App = () => {
  const cart = useSelector((state) => state.cart);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // storageRef
    // 	.child('hair-and-makeup')
    // 	.listAll()
    // 	.then((res) => {
    // 		res.items.forEach((item) => {
    // 			item.getDownloadURL().then((res) => {
    // 				console.log(res);
    // 			});
    // 		});
    // 	});
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/about" element={<About />} />
        <Route exact path="/shop/:category" element={<Shop />} />
        <Route exact path="/services" element={<Services />} />
        <Route exact path="/cart" element={<Cart />} />
        <Route
          exact
          path="/checkout"
          element={<Checkout cart={cart} order={order} error={errorMessage} />}
        />
        <Route exact path="/product/:id" element={<ProductDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
