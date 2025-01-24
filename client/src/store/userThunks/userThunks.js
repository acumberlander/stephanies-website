import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _createOrder,
  _createUser,
  _fetchUserByUid,
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
        return rejectWithValue({ error: "User not found" });
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
  async (orderData, { getState, rejectWithValue }) => {
    const { user } = getState();
    try {
      await _createOrder(orderData, user.uid);

      // Create updated orders array
      const updatedOrders = user.orders
        ? [...user.orders, orderData]
        : [orderData];

      // Return updated orders and cart data (for Redux)
      return {
        cart: {
          cart_items: [],
          total_items: 0,
          subtotal: 0,
        },
        orders: updatedOrders,
      };
    } catch (err) {
      // Extract and return error message
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
