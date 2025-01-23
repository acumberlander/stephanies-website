import { createAsyncThunk } from "@reduxjs/toolkit";
// import { fetchUserByUid } from "../../api/userRequests";
import axios from "axios";

/**
 * @param userData
 * Creates a user object in redux as well as in mongodb.
 * The _id property will have a value of null.
 */
export const createUser = createAsyncThunk(
  "user/createUser",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post("/api/users", userData);
      return response.data; // The newly created user document
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
      const response = await axios.get(`/api/users/${uid}`);
      return response.data;
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
      // Updates orders in mongoDB
      await axios.put(`/api/users/${user.uid}/orders`, { orderData });

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
