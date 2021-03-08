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
	// return action.payload;
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
			let itemToAdd = cart.line_items.find((item) => item.id === action.id);

			// check if the action id exists in the line_items
			if (!itemToAdd) {
				return action.payload;
			} else {
				itemToAdd.quantity += 1;
				return {
					...cart,
					line_items: [...cart.line_items, itemToAdd],
					subtotal: {
						raw: `${cart.subtotal.raw + itemToAdd.price}`,
						formatted: `${cart.subtotal.raw + itemToAdd.price}.00`,
						formatted_with_symbol: `$${cart.subtotal.raw + itemToAdd.price}.00`,
						formatted_with_code: `$${
							cart.subtotal.raw + itemToAdd.price
						}.00 USD`,
					},
					total_items: cart.total_items + 1,
				};
			}

		case REMOVE_FROM_CART:
			let itemToRemove = cart.line_items.find((item) => item.id === action.id);
			let newArray = cart.line_items.filter((item) => item.id !== action.id);

			if (!itemToRemove) {
				return action.payload;
			} else {
				itemToRemove.quantity -= 1;
				return {
					...cart,
					line_items: newArray,
					subtotal: {
						raw: `${cart.subtotal.raw - itemToAdd.price}`,
						formatted: `${cart.subtotal.raw - itemToAdd.price}.00`,
						formatted_with_symbol: `$${cart.subtotal.raw - itemToAdd.price}.00`,
						formatted_with_code: `$${
							cart.subtotal.raw - itemToAdd.price
						}.00 USD`,
					},
					total_items: cart.total_items - 1,
				};
			}

		default:
			return cart;
	}
};

export default cartReducer;
