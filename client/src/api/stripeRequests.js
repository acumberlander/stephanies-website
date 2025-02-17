import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/**
 *
 * @returns {Promise<product[]>} Returns all the products in Stripe database
 */
export const _fetchAllStripeProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/stripe/products`);
  return response.data;
};

/**
 * @param {string} id
 * @returns {Promise<product>} Returns Stripe product by id from Stripe database
 */
export const _fetchStripeProductById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/api/stripe/product/${id}`);
  return data;
};

/**
 *
 * @param {array} cartItems
 * @returns {Promise<sessionObject>} A stripe sessionObject
 */
export const _createStripeCheckoutSession = async (cartItems) => {
  const { data } = await axios.post(
    `${baseUrl}/api/stripe/create-checkout-session`,
    { cartItems }
  );
  return data;
};

/**
 *
 * @param {string} sessionId
 * @returns {Promise<product[]>} An array of items purchased within a order session/transaction
 */
export const _fetchSessionLineItems = async (sessionId) => {
  const { data } = await axios.get(
    `${baseUrl}/api/stripe/sessions/${sessionId}/line_items`
  );
  return data;
};
