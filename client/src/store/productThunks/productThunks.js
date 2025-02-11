import { createAsyncThunk } from "@reduxjs/toolkit";
import { _fetchAllProducts, _fetchProductById } from "../../api/mongoRequests";
import {
  _fetchAllStripeProducts,
  _fetchStripeProductById,
} from "../../api/stripeRequests";

// Thunk to fetch all products
export const fetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await _fetchAllStripeProducts();
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
      const response = await _fetchStripeProductById(productId);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
// Thunk to fetch all products
export const fetchAllStripeProducts = createAsyncThunk(
  "products/fetchAllStripeProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await _fetchAllStripeProducts();
      console.log("products: ", response);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// Thunk to fetch all products
export const fetchStripeProductById = createAsyncThunk(
  "products/fetchStripeProductById",
  async ({ productId }, { rejectWithValue }) => {
    try {
      const response = await _fetchStripeProductById(productId);
      return response;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
