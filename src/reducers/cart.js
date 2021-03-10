import {
	FETCH_CART,
	ADD_TO_CART,
	REMOVE_FROM_CART,
	EMPTY_CART,
	UPDATE_QUANTITY,
	REFRESH_CART,
	CAPTURE_CHECKOUT,
} from '../constants/actionTypes';

const cartReducer = (cart = {}, action) => {
	switch (action.type) {
		case FETCH_CART:
			return action.payload;

		case EMPTY_CART:
			return action.payload;

		case UPDATE_QUANTITY:
			return action.payload;

		case REFRESH_CART:
			return action.payload;

		case ADD_TO_CART:
			return action.payload;

		case REMOVE_FROM_CART:
			return action.payload;

		default:
			return cart;
	}
};

export default cartReducer;
