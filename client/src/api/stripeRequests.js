import axios from "axios";

const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5001";

/********************************************** Product Requests ***********************************************/

/**
 *
 * @returns {Promise<product[]>} Returns all products from Stripe database
 */
export const _fetchAllStripeProducts = async () => {
  const { data } = await axios.get(`${baseUrl}/stripe/products`);

  return data;
};

/**
 * @param {string} id
 * @returns {Promise<product>} Returns Stripe product by id from Stripe database
 */
export const _fetchStripeProductById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/stripe/product/${id}`);
  return data;
};

/**
 * @param {object} product
 * @returns {Promise<product>} Returns newly createdStripe product by id from Stripe database
 */
export const _createProduct = async (product) => {
  const { data } = await axios.post(`${baseUrl}/stripe/products`, product);
  return data;
};

/**
 *
 * @param {object} product
 * @returns {Promise<product>} Returns updated product
 */
export const _updateProduct = async (product) => {
  const { data } = await axios.put(
    `${baseUrl}/stripe/product/${product.id}`,
    product
  );
  return data;
};

/**
 *
 * @param {object} product
 * @returns {Promise<product>} Returns archived product
 */
export const _archiveProduct = async (productId) => {
  const { data } = await axios.put(
    `${baseUrl}/stripe/product/${productId}/status`,
    {
      active: false,
    }
  );
  return data;
};

/**
 *
 * @param {object} product
 * @returns {Promise<product>} Returns unarchived product
 */
export const _unarchiveProduct = async (productId) => {
  const { data } = await axios.put(
    `${baseUrl}/stripe/product/${productId}/status`,
    {
      active: true,
    }
  );
  return data;
};

/********************************************** Checkout Request ***********************************************/

/**
 *
 * @param {array} cartItems
 * @returns {Promise<sessionObject>} A stripe sessionObject
 */
export const _createStripeCheckoutSession = async (cartItems) => {
  const { data } = await axios.post(
    `${baseUrl}/stripe/create-checkout-session`,
    { cartItems }
  );
  return data;
};

/**
 *
 * @param {string} sessionId
 * @returns {Promise<sessionObject>} A stripe sessionObject
 */
export const _fetchCheckoutSession = async (sessionId) => {
  const { data } = await axios.get(
    `${baseUrl}/stripe/session/${sessionId}`
  );
  return data.data;
};

/**
 *
 * @returns {Promise<sessionObject[]>} An array of all stripe sessionObjects
 */
export const _fetchAllCheckoutSessions = async () => {
  const { data } = await axios.get(`${baseUrl}/stripe/sessions`);
  return data.data;
};

/********************************************** Payment Intent Request ***********************************************/

export const _fetchAllPaymentIntents = async () => {
  const { data } = await axios.get(`${baseUrl}/stripe/paymentIntents`);
  return data.data;
};

export const _fetchPaymentIntentById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/stripe/paymentIntents/${id}`);
  return data.data;
};


/********************************************** Invoice Request ***********************************************/


export const _fetchInvoiceById = async (id) => {
  const { data } = await axios.get(`${baseUrl}/stripe/invoices/${id}`);
  return data;
};

export const _fetchAllInvoices = async () => {
  const { data } = await axios.get(`${baseUrl}/stripe/invoices`);
  return data;
};


/********************************************** Order Session Request ***********************************************/

/**
 *
 * @param {string} sessionId
 * @returns {Promise<product[]>} An array of items purchased within a order session/transaction
 */
export const _fetchSessionLineItems = async (sessionId) => {
  const { data } = await axios.get(
    `${baseUrl}/stripe/sessions/${sessionId}/line_items`
  );
  return data.data;
};

/********************************************** Coupon Requests ***********************************************/

export const _fetchAllCoupons = async () => {
  const { data } = await axios.get(`${baseUrl}/stripe/coupons`);
  return data;
};

export const _createCoupon = async (coupon) => {
  const { data } = await axios.post(`${baseUrl}/stripe/coupons`, coupon);
  return data;
};

export const _deleteCoupon = async (id) => {
  const { data } = await axios.delete(`${baseUrl}/stripe/coupons/${id}`);
  return data;
};

export const _editCoupon = async (id, coupon) => {
  const { data } = await axios.put(`${baseUrl}/stripe/coupons/${id}`, coupon);
  return data;
};

/********************************************** Customer Requests ***********************************************/

/**
 * Creates a Stripe customer
 * @param {Object} customerData - Customer data including email and name
 * @returns {Promise<Object>} Stripe customer object
 */
export const _createStripeCustomer = async (customerData) => {
  const response = await axios.post(`${baseUrl}/stripe/customers`, customerData);
  return response.data;
};
