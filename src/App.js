import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  MyNavbar,
  Cart,
  Checkout,
  About,
  Home,
  Shop,
  Footer,
  ProductDetails,
  Services,
} from "./components";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
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
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/about">
          <About />
        </Route>
        <Route exact path="/shop/:category">
          <Shop />
        </Route>
        <Route exact path="/services">
          <Services />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/checkout">
          <Checkout cart={cart} order={order} error={errorMessage} />
        </Route>
        <Route exact path="/product/:id">
          <ProductDetails />
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
