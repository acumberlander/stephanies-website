import React, { useState, useEffect } from 'react';
import commerce from './lib/commerce';
import { useDispatch, useSelector } from 'react-redux';
import MyNavbar from './components/AppComponents/MyNavbar/MyNavbar';
import Cart from './components/Pages/Cart/Cart';
import Checkout from './components/Pages/Checkout/Checkout';
import About from './components/Pages/About/About';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { fetchProducts } from './actions/products';
import { fetchCart, captureCheckout } from './actions/cart';
import Home from './components/Pages/Home/Home';
import Shop from './components/Pages/Shop/Shop';
import Footer from './components/AppComponents/Footer/Footer';
import ProductDetails from './components/Pages/ProductDetails/ProductDetails';

const App = () => {
	const cart = useSelector((state) => state.cart);
	const [order, setOrder] = useState({});
	const [errorMessage, setErrorMessage] = useState('');
	const dispatch = useDispatch();

	// const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
	// 	try {
	// 		const incomingOrder = await commerce.checkout.capture(
	// 			checkoutTokenId,
	// 			newOrder
	// 		);

	// 		setOrder(incomingOrder);
	// 		refreshCart();
	// 	} catch (error) {
	// 		console.log(error);
	// 		setErrorMessage(error.data.error.message);
	// 	}
	// };

	const handleCaptureCheckout = () => {
		dispatch(captureCheckout());
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
