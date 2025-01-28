import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  _createOrder,
  _createUser,
  _fetchUserByUid,
} from "../../api/mongoRequests";
import {
  getAuth,
  GoogleAuthProvider,
  linkWithCredential,
  EmailAuthProvider,
  signInWithPopup,
} from "firebase/auth";

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
      console.log("fetchUserByUid: ", response);
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
 * Converts anonymous Firebase user to credentialed user via Google authorization
 */
export const convertToGoogleAuth = createAsyncThunk(
  "user/convertToGoogleAuth",
  async (_, { getState, rejectWithValue }) => {
    try {
      const auth = getAuth();
      const currentUser = auth.currentUser;
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);

      // Extract credential from the signIn result
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (!credential) {
        throw new Error("GoogleAuthProvider credential is undefined");
      }

      const googleUser = result.user;
      const { user } = getState();
      console.log("user directly from state: ", { ...user });
      const firstName = googleUser.displayName.split(" ")[0];
      const lastName = googleUser.displayName.split(" ")[1];
      const mergedUserState = {
        ...user,
        oldUid: user.uid,
        uid: googleUser.uid, // Google uid takes over old firebase uid
        firstName,
        lastName,
        email: googleUser.email,
      };
      console.log("mergedUserState: ", mergedUserState);

      linkWithCredential(currentUser, credential).then(() => {
        return mergedUserState;
      });
      console.log("Successfully converted anonymous user to Google account");
    } catch (error) {
      if (error.message.includes("auth/provider-already-linked")) {
        return;
      }
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
