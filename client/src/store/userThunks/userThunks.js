import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _createUser,
  _fetchUserByUid,
  _createOrder,
} from "../../api/mongoRequests";

/**
 * @param userData
 * Creates a user object in redux as well as in mongodb.
 * The _id property will have a value of null.
 */
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await _createUser(userData);
      return response;
    } catch (err) {
      if (err.response && err.response.data) {
        return rejectWithValue(err.response.data);
      }
      return rejectWithValue(err.message);
    }
  }
);

export const fetchUserByUid = createAsyncThunk(
  "user/fetchUserByUid",
  async (uid, { rejectWithValue }) => {
    try {
      const response = await _fetchUserByUid(uid);
      return response;
    } catch (err) {
      if (err.response && err.response.status === 404) {
        console.warn("User not found in MongoDB.");
      }
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * @param orderData
 */
export const createOrder = createAsyncThunk(
  "user/createOrder",
  async (sessionId, { getState, rejectWithValue }) => {
    const { user } = getState();
    const { subtotal } = user.cart;
    const { uid } = user;

    try {
      // Creates an order object in mongoDB
      const newOrder = await _createOrder(sessionId, uid, subtotal);

      // Empty the cart after checkout (for both guest and authenticated users)
      const emptyCart = {
        cart_items: [],
        total_items: 0,
        subtotal: 0,
      };

      if (user.isAuthenticated) {
        return { cart: emptyCart, orders: [...user.orders, newOrder] };
      } else {
        const storedGuestUser = JSON.parse(localStorage.getItem("guestUser"));
        if (storedGuestUser.cart.cart_items.length > 0) {
          const guestUserWithEmptyCart = {
            ...storedGuestUser,
            uid: storedGuestUser.uid,
            cart: emptyCart,
            orders: [...storedGuestUser.orders, newOrder],
          };
          localStorage.setItem(
            "guestUser",
            JSON.stringify(guestUserWithEmptyCart)
          );
        }
        return { cart: emptyCart, orders: [newOrder] };
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
