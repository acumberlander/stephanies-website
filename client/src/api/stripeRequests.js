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
  const response = await axios.get(`${baseUrl}/api/stripeProducts/${id}`);
  return response.data;
};

/**
 * @returns Creates a transaction session in Stripe
 */
export const _stripeCheckout = async (cartItems) => {
  const response = await axios.post(
    `${baseUrl}/api/checkout/create-payment-intent`,
    {
      items: cartItems,
    }
  );
  return response.data;
};
