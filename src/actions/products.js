import {
	FETCH_ALL_PRODUCTS,
	FETCH_PRODUCT_BY_ID,
} from '../constants/actionTypes';
import commerce from '../lib/commerce';

export const fetchProducts = () => async (dispatch) => {
	try {
		const { data } = await commerce.products.list();

		dispatch({ type: FETCH_ALL_PRODUCTS, payload: data });
	} catch (error) {
		console.log(error);
	}
};

export const fetchProductById = (id) => async (dispatch) => {
	try {
		const data = await commerce.products.retrieve(id);

		dispatch({ type: FETCH_PRODUCT_BY_ID, payload: data });
	} catch (error) {
		console.log(error);
	}
};
