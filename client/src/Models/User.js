import { userTypes } from "../constants/constants";

export const userModel = {
  _id: null,
  uid: null,
  oldUid: null,
  firstName: null,
  lastName: null,
  type: userTypes.guest,
  isAdmin: false,
  cart: {
    cart_items: [],
    total_items: 0,
    subtotal: 0,
  },
  orders: [],
  status: "idle",
  error: null,
};
