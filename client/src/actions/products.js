import {
	FETCH_ALL_PRODUCTS,
	FETCH_PRODUCT_BY_ID,
} from '../constants/actionTypes';
import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from '../firebaseConfig';
const productsCol = collection(db, 'products');
const productsSnapshot = await getDocs(productsCol);
const productList = productsSnapshot.docs.map(doc => doc.data());


export const fetchProducts = () => async (dispatch) => {
	try {
		dispatch({ type: FETCH_ALL_PRODUCTS, payload: productList });
	} catch (error) {
		console.log(error);
	}
};

export const fetchProductById = (id) => async (dispatch) => {
	try {
		const productById =productList.filter(product => product.id === id)[0];
		dispatch({ type: FETCH_PRODUCT_BY_ID, payload: productById });
	} catch (error) {
		console.log(error);
	}
};
