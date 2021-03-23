import { LOGIN } from '../constants/actionTypes';
import commerce from '../lib/commerce';

export const login = (email) => async (dispatch) => {
	try {
		const { data } = await commerce.customers.login(
			email,
			'http://localhost:3000'
		);
		console.log(data);
		dispatch({ type: LOGIN, payload: data });
	} catch (error) {
		console.log(error);
	}
};
