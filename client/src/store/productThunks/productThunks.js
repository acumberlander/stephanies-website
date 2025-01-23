import { createAsyncThunk } from "@reduxjs/toolkit";
import { _fetchAllProducts, _fetchProductById } from "../../api/mongoRequests";

// Thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await _fetchAllProducts();
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk to fetch all products
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await _fetchProductById(productId);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
