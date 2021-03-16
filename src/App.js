import React, { useState, useEffect } from 'react';
import commerce from './lib/commerce';
import { useDispatch, useSelector } from 'react-redux';
import MyNavbar from './components/MyNavbar/MyNavbar';
import Cart from './components/Cart/Cart';
import Checkout from './components/CheckoutForm/Checkout/Checkout';
import About from './components/About/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fetchProducts } from './actions/products';
import { fetchCart, refreshCart } from './actions/cart';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Footer from './components/Footer/Footer';
import ProductDetails from './components/Product/ProductDetails/ProductDetails';

const App = () => {
	const cart = useSelector((state) => state.cart);
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();

	const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
		try {
			const incomingOrder = await commerce.checkout.capture(
				checkoutTokenId,
				newOrder
			);

			setOrder(incomingOrder);
			refreshCart();
		} catch (error) {
			console.log(error);
			setErrorMessage(error.data.error.message);
		}
	};

	useEffect(() => {
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
				<Route exact path="/shop/:category">
					<Shop />
				</Route>
				<Route exact path="/about">
					<About />
				</Route>
				<Route exact path="/cart">
					<Cart />
				</Route>
				<Route exact path="/checkout">
					<Checkout
						cart={cart}
						order={order}
						onCaptureCheckout={handleCaptureCheckout}
						error={errorMessage}
					/>
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
