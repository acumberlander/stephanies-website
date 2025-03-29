import { createAsyncThunk } from "@reduxjs/toolkit";
import { _fetchAllProducts, _fetchProductById } from "../../api/mongoRequests";
import {
  _fetchAllStripeProducts,
  _fetchStripeProductById,
} from "../../api/stripeRequests";

// Thunk to fetch all products
export const fetchAllStripeProducts = createAsyncThunk(
  "products/fetchAllStripeProducts",
  async (_, { rejectWithValue }) => {
    try {
      const response = await _fetchAllStripeProducts();
      return response;
    } catch (err) {
      return rejectWithValue("Unable to fetch products at this time");
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
      return rejectWithValue("Unable to fetch product at this time");
    }
  }
);
