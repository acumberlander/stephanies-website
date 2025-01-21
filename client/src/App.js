import React, { useState, useEffect } from "react";
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
} from "./components";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { signInUser } from "./store/userThunks/userThunks"
import { getAllProducts } from "./store/productThunks/productThunks";
import ThankYou from "./Pages/ThankYouPage/ThankYou";
import "./App.scss";

const App = () => {
  const cart = useSelector((state) => state.cart);
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();
  const { uid, status } = useSelector((state) => state.user)

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
    if (!uid) {
      dispatch(signInUser())
      dispatch(getAllProducts())
    }
  }, [uid, dispatch]);


  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/shop/:category" element={<Shop />} />
        <Route  path="/cart" element={<Cart />} />
        <Route
          path="/checkout"
          element={<Checkout order={order} error={errorMessage} />}
        />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
