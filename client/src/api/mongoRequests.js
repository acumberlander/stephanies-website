import axios from "axios";
import { userModel } from "../Models/User";
import { _fetchSessionLineItems } from "./stripeRequests";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/********************************************** User Requests ***********************************************/

/**
 *
 * @param {userModel} userData
 * @returns Returns the newly created user document
 */
export const _createUser = async (userData) => {
  const response = await axios.post(`${baseUrl}/api/users`, userData);
  return response.data;
};

/**
 *
 * @param {string} uid
 * @returns Fetches user from mongoDB by uid.
 */
export const _fetchUserByUid = async (uid) => {
  const response = await axios.get(`${baseUrl}/api/users/${uid}`);
  return response.data;
};

/************************************************************************************************************/

/********************************************** Order Request ***********************************************/

/**
 *
 * @param {object} orderData
 * @param {string} uid
 * @returns Updates user orders in mongoDB
 */
export const _createUserOrder = async (orderData, uid) => {
  const response = await axios.put(`${baseUrl}/api/users/${uid}/orders`, {
    orderData,
  });
  return response.data;
};

/**
 *
 * @param {object} orderData
 * @param {string} uid
 * @returns Updates orders in mongoDB
 */
export const _createOrder = async (sessionId, uid, subtotal) => {
  const lineItems = await _fetchSessionLineItems(sessionId);
  const { data: newOrder } = await axios.post(`${baseUrl}/api/orders`, {
    uid,
    sessionId,
    lineItems,
    subtotal,
  });
  return newOrder;
};

/************************************************************************************************************/

/********************************************** Cart Requests ***********************************************/

/**
 *
 * @param {string} uid
 * @returns Empties user mongoDB cart
 */
export const _emptyCart = async (uid) => {
  const response = await axios.put(`${baseUrl}/api/users/${uid}/cart`, {
    cart_items: [],
    total_items: 0,
    subtotal: 0,
  });
  return response.data;
};

/**
 *
 * @param {string} uid
 * @returns Adds products to user's mongoDB cart
 */
export const _addToCart = async (uid, cart) => {
  const response = await axios.put(`${baseUrl}/api/users/${uid}/cart`, cart);
  return response.data;
};

/**
 *
 * @param {string} uid
 * @param {object} cart
 * @returns Will either decrement or increment the user's product quantity in mongoDB cart
 */
export const _updateProductQuantity = async (uid, cart) => {
  const response = await axios.put(`${baseUrl}/api/users/${uid}/cart`, cart);
  return response.data;
};

/**
 *
 * @param {string} uid
 * @param {object} cart
 * @returns Will either decrement or increment the user's product quantity in mongoDB cart
 */
export const _removeProductFromCart = async (uid, cart) => {
  const response = await axios.put(`${baseUrl}/api/users/${uid}/cart`, cart);
  return response.data;
};

/************************************************************************************************************/

/********************************************** Product Requests ***********************************************/

/**
 *
 * @param {string} uid
 * @param {object} cart
 * @returns Returns all the products in mongoDB
 */
export const _fetchAllProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/products`);
  return response.data;
};

/**
 *
 * @param {string} uid
 * @param {object} cart
 * @returns Returns all the products in mongoDB
 */
export const _fetchProductById = async (productId) => {
  const response = await axios.get(`${baseUrl}/api/product/${productId}`);
  return response.data;
};

/************************************************************************************************************/
