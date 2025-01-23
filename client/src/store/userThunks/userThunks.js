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
 * @param userData
 * Adds the _id value to the current user redux state.
 */
// export const setUser = createAsyncThunk(
//   "user/setUser",
//   async (mongoUser, { rejectWithValue }) => {
//     try {
//       const user = await fetchUserByUid(uid);
//       if (!user) {
//         const userData = {
//           ...userModel,
//           uid,
//         };
//       }
//       return user;
//     } catch (err) {
//       return rejectWithValue(err.response?.data || err.message);
//     }
//   }
// );

/**
 * @param uid
 * @param order
 */
export const createOrder = createAsyncThunk(
  "user/createOrder",
  async ({ uid, order }, { rejectWithValue }) => {
    try {
      // Assume your server adds `order` to `orders` array, empties the cart, etc.
      const res = await axios.put(`/api/users/${uid}/orders`, { order });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
