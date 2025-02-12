import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _createOrder,
  _emptyCart,
  _fetchOrdersByUid,
} from "../../api/mongoRequests";
import { emptyCart } from "../cartThunks/cartThunks";

/**
 * @param sessionId
 */
export const createOrder = createAsyncThunk(
  "order/createOrder",
  async (sessionId, { getState, dispatch, rejectWithValue }) => {
    const { user } = getState();
    const { subtotal } = user.cart;
    const { uid } = user;

    try {
      // Get user's array of past orders
      const oldOrders = await _fetchOrdersByUid(uid);

      // Creates an order object in mongoDB
      const newOrder = await _createOrder(sessionId, uid, subtotal);

      if (!uid && uid.includes("guest")) {
        const storedGuestUser = JSON.parse(localStorage.getItem("guestUser"));
        if (storedGuestUser.cart.cart_items.length > 0) {
          const guestUserWithEmptyCart = {
            ...storedGuestUser,
            uid: storedGuestUser.uid,
            cart: {
              cart_items: [],
              total_items: 0,
              subtotal: 0,
            },
          };
          localStorage.setItem(
            "guestUser",
            JSON.stringify(guestUserWithEmptyCart)
          );
        }
      }

      // Empties the user's cart in mongoDB
      dispatch(emptyCart(true));

      // Updates the cart in redux state
      return { orders: [...oldOrders, newOrder] };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Async thunk that returns an array of the current user's orders and copies that to the redux state.
 * @param {string} uid
 */
export const fetchOrdersByUid = createAsyncThunk(
  "orders/fetchOrdersByUid",
  async (uid, { rejectWithValue }) => {
    try {
      const userOrders = await _fetchOrdersByUid(uid);
      return userOrders;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
