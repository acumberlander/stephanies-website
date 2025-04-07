import axios from "axios";
import { userModel } from "../Models/User";
import {
  _fetchCheckoutSession,
  _fetchSessionLineItems,
} from "./stripeRequests";
import { formatStripeAmount } from "../utils/formatFunctions/formatStripeAmounts";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/********************************************** User Requests ***********************************************/

/**
 *
 * @param {userModel} userData
 * @returns {Promise<userModel>} Returns the newly created user document
 */
export const _createUser = async (userData) => {
  const response = await axios.post(`${baseUrl}/users`, userData);
  return response.data;
};

/**
 *
 * @param {string} uid
 * @returns {userObject} Fetches user from mongoDB by uid.
 */
export const _fetchUserByUid = async (uid) => {
  const response = await axios.get(`${baseUrl}/users/${uid}`);
  return response.data;
};

/********************************************** Order Request ***********************************************/

/**
 * Returns an array of all the orders the user has made.
 * @param {string} uid
 * @returns {Promise<orderObject[]>} An array of order objects.
 */
export const _fetchOrdersByUid = async (uid) => {
  const { data } = await axios.get(`${baseUrl}/orders/${uid}`);
  return data;
};

/**
 * Creates an order object in mongoDB. Generates a uid if the user is a guest.
 * @param {string} sessionId
 * @param {string} uid
 * @param {number} subtotal
 * @returns {orderObject} Newly created mongoDB order object
 */
export const _createOrder = async (sessionId, user) => {
  const { uid, cart, newMember } = user;
  const cartItems = cart.cart_items;
  const { subtotal } = cart;

  const session = await _fetchCheckoutSession(sessionId);

  const { amount_tax, amount_shipping, amount_discount, created } = session.total_details;
  const { payment_intent } = session;
  const total = subtotal + amount_tax + amount_shipping - amount_discount;

  const { data: newOrder } = await axios.post(`${baseUrl}/orders`, {
    uid: uid,
    payment_intent: payment_intent,
    lineItems: cartItems,
    subtotal,
    tax: amount_tax,
    shipping: amount_shipping,
    discount: amount_discount,
    total: total,
    created,
    newMember: newMember,
  });

  return newOrder;
};

/********************************************** Cart Requests ***********************************************/

/**
 *
 * @param {string} uid
 * @returns {cartObject} Empties user mongoDB cart
 */
export const _emptyCart = async (uid) => {
  const response = await axios.put(`${baseUrl}/users/${uid}/cart`, {
    cart_items: [],
    total_items: 0,
    subtotal: 0,
  });
  return response.data;
};

/**
 *
 * @param {string} uid
 * @param {object} cart
 * @returns {cartObject} Adds products to user's mongoDB cart
 */
export const _addToCart = async (uid, cart) => {
  const response = await axios.put(`${baseUrl}/users/${uid}/cart`, cart);
  return response.data;
};

/**
 *
 * @param {string} uid
 * @param {object} cart
 * @returns {userObject} Will either decrement or increment the user's product quantity in mongoDB cart
 */
export const _updateProductQuantity = async (uid, cart) => {
  const response = await axios.put(`${baseUrl}/users/${uid}/cart`, cart);
  return response.data;
};

/**
 *
 * @param {string} uid
 * @param {object} cart
 * @returns {userObject} Will either decrement or increment the user's product quantity in mongoDB cart
 */
export const _removeProductFromCart = async (uid, cart) => {
  const response = await axios.put(`${baseUrl}/users/${uid}/cart`, cart);
  return response.data;
};
