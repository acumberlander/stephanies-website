export const userModel = {
  _id: null,
  uid: null,
  isAuthenticated: false,
  cart: {
    cart_items: [],
    total_items: 0,
    subtotal: 0,
  },
  status: "idle",
  error: null,
};
