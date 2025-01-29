import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _createOrder,
  _createUser,
  _fetchUserByUid,
  _updateUser,
} from "../../api/mongoRequests";
import {
  getAuth,
  GoogleAuthProvider,
  EmailAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { userModel } from "../../Models/User";
import { setAuth } from "../slices/authSlice";
import { userTypes } from "../../constants/constants";

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

/**
 * Thunk that authenticates the user with Google
 */
export const signOutWithGoogle = createAsyncThunk(
  "user/signOutWithGoogle",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      // Sign out with google
      const auth = getAuth();
      await signOut(auth);

      // return a clear user
      return { ...userModel };
    } catch (error) {
      // Handle provider-already-linked errors and others
      if (error.message.includes("auth/provider-already-linked")) {
        console.warn("Provider is already linked");
        return;
      }

      // Log errors and reject with proper message
      console.error("Error signing in with Google: ", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

/**
 * Thunk that authenticates the user with Google
 */
export const signInWithGoogle = createAsyncThunk(
  "user/signInWithGoogle",
  async (_, { getState, rejectWithValue, dispatch }) => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();

      const result = await signInWithPopup(auth, provider);
      const googleUser = result.user;

      const { user } = getState(); // Ensure state.user exists
      if (!user) throw new Error("User state is undefined");

      const firstName = googleUser.displayName.split(" ")[0];
      const lastName = googleUser.displayName.split(" ")[1];

      const updatedUser = {
        ...user,
        oldUid: user.uid,
        type: userTypes?.google || "google", // Ensure userTypes.google is defined
        uid: googleUser.uid,
        firstName,
        lastName,
        email: googleUser.email,
      };

      const userExists = await _fetchUserByUid(user.uid);

      if (userExists) {
        await _updateUser(user.uid, updatedUser); // Ensure async function is awaited
      }
      dispatch(setAuth(true)); // Set isAuthenticated directly as a boolean

      return updatedUser;
    } catch (error) {
      if (error.message.includes("auth/provider-already-linked")) {
        console.warn("Provider is already linked");
        return rejectWithValue("Provider is already linked.");
      }

      console.error("Error signing in with Google: ", error);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
