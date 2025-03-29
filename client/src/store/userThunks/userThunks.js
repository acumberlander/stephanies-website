import { createAsyncThunk } from "@reduxjs/toolkit";
import { _createUser, _fetchUserByUid } from "../../api/mongoRequests";

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
      return rejectWithValue("Unable to create user at this time.");
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
      return rejectWithValue("Unable to fetch user at this time.");
    }
  }
);
