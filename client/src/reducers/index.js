import { combineReducers } from 'redux';

import cart from './cart';
import products from './products';
import user from './user';

export default combineReducers({ cart, products, user });
