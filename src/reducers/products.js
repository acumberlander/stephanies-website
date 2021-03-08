import {
	FETCH_ALL_PRODUCTS,
	FETCH_PRODUCT_BY_ID,
} from '../constants/actionTypes';

const productReducer = (products = [], action) => {
	switch (action.type) {
		case FETCH_ALL_PRODUCTS:
			return action.payload;

		case FETCH_PRODUCT_BY_ID:
			return action.payload;

		default:
			return products;
	}
};

export default productReducer;
