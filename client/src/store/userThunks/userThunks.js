import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _createOrder,
  _createUser,
  _fetchUserByUid,
} from "../../api/mongoRequests";
import { updateGuestUser } from "../slices/userSlice";

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
  async (orderData, { getState, dispatch, rejectWithValue }) => {
    const { user } = getState();

    try {
      if (user.isAuthenticated) {
        // Authenticated users: Store order in MongoDB
        await _createOrder(orderData, user.uid);
      } else {
        // Guest users: Store orders in local storage
        const guestOrders =
          JSON.parse(localStorage.getItem("guestOrders")) || [];
        guestOrders.push(orderData);
        localStorage.setItem("guestOrders", JSON.stringify(guestOrders));
      }

      // Empty the cart after checkout (for both guest and authenticated users)
      const emptyCart = {
        cart_items: [],
        total_items: 0,
        subtotal: 0,
      };

      if (user.isAuthenticated) {
        return { cart: emptyCart, orders: [...user.orders, orderData] };
      } else {
        dispatch(updateGuestUser({ cart: emptyCart })); // Clear guest cart
        return { cart: emptyCart };
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
