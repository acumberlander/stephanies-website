import {
	FETCH_ALL_PRODUCTS,
	FETCH_PRODUCT_BY_ID,
} from '../constants/actionTypes';
import { getProducts, getProductById } from '../api/firebaseRequests';


export const fetchProducts = () => async (dispatch) => {
	try {
		 getProducts()
		 	.then((products) => {
				 dispatch({ type: FETCH_ALL_PRODUCTS, payload: products });
			})
	} catch (error) {
		console.log(error);
	}
};

export const fetchProductById = (id) => async (dispatch) => {
	try {
		getProductById(id)
			.then((product) => {
				dispatch({ type: FETCH_PRODUCT_BY_ID, payload: product });
			})
	} catch (error) {
		console.log(error);
	}
};
