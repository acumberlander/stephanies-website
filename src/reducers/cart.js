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
	}
};
