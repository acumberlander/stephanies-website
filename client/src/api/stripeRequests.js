import axios from "axios";
import { userModel } from "../Models/User";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/**
 *
 * @returns Returns all the products in Stripe database
 */
export const _fetchAllStripeProducts = async () => {
  const response = await axios.get(`${baseUrl}/api/stripeProducts`);
  return response.data;
};

/**
 * @param {string} id
 * @returns Returns Stripe product by id from Stripe database
 */
export const _fetchStripeProductById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/api/stripeProducts/${id}`);
  return data;
};

/**
 * @returns Creates a transaction session in Stripe
 */
export const _stripeCreatePaymentIntent = async (cartItems) => {
  const response = await axios.post(
    `${baseUrl}/api/checkout/create-payment-intent`,
    {
      items: cartItems,
    }
  );
  return response.data;
};

/**
 * @returns Creates a checkout session in Stripe
 */
export const _stripeCheckout = async (cartItems, uid) => {
  const { data } = await axios.post(
    `${baseUrl}/api/checkout/create-checkout-session`,
    { cartItems, uid }
  );
  return data;
};

export const _fetchPaymentStatus = async (sessionId) => {
  const { data } = await axios.get(
    `${baseUrl}/api/thank-you/session-status?session_id=${sessionId}`
  );
  return data;
};
