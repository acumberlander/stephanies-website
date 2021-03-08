import {
	FETCH_CART,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	UPDATE_QUANTITY,
	REFRESH_CART,
	CAPTURE_CHECKOUT,
} from '../constants/actionTypes';
import commerce from '../lib/commerce';

export const fetchCart = () => async (dispatch) => {
	const data = await commerce.cart.retrieve();

	dispatch({ type: FETCH_CART, payload: data });
};

export const addToCart = (productId, quantity) => async (dispatch) => {
	try {
		const { cart } = await commerce.cart.add(productId, quantity);

		dispatch({ type: ADD_TO_CART, payload: cart, id: productId });
	} catch (error) {
		console.log(error);
	}
};

export const updateCartQty = (productId, quantity) => async (dispatch) => {
	try {
		const { cart } = await commerce.cart.update(productId, { quantity });

		dispatch({ type: UPDATE_QUANTITY, payload: cart, id: productId });
	} catch (error) {
		console.log(error);
	}
};

export const removeFromCart = (productId) => async (dispatch) => {
	try {
		const { cart } = await commerce.cart.remove(productId);

		dispatch({ type: REMOVE_FROM_CART, payload: cart, id: productId });
	} catch (error) {
		console.log(error);
	}
};

export const emptyCart = () => async (dispatch) => {
	try {
		const { cart } = await commerce.cart.empty();

		dispatch({ type: EMPTY_CART, payload: cart });
	} catch (error) {
		console.log(error);
	}
};

export const refreshCart = () => async (dispatch) => {
	try {
		const newCart = await commerce.cart.refresh();

		dispatch({ type: REFRESH_CART, payload: newCart });
	} catch (error) {
		console.log(error);
	}
};

export const captureCheckout = (checkoutTokenId, newOrder) => async (
	dispatch
) => {
	try {
		const incomingOrder = await commerce.checkout.capture(
			checkoutTokenId,
			newOrder
		);

		dispatch({ type: CAPTURE_CHECKOUT, payload: incomingOrder });

		refreshCart();
	} catch (error) {
		debugger;
		console.log(error);
	}
};
