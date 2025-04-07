export const userModel = {
  _id: null,
  stripeCustomerId: null,
  uid: null,
  cart: {
    cart_items: [],
    total_items: 0,
    subtotal: 0,
  },
  status: "idle",
  error: null,
  isAdmin: false,
  newMember: false,
  isAuthenticated: false,
};
