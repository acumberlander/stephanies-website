export const userModel = {
  uid: null,
  isGuest: true,
  cart: {
    cart_items: [],
    total_items: 0,
    subtotal: 0
  },
  orders: [],
  status: "idle",
  error: null
};