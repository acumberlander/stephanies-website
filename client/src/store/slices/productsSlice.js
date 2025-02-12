import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllStripeProducts,
  fetchStripeProductById,
} from "../productThunks/productThunks";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    items: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // getAllProducts
    builder
      .addCase(fetchAllStripeProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchAllStripeProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchAllStripeProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // getProductById
      .addCase(fetchStripeProductById.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchStripeProductById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.current = action.payload;
      })
      .addCase(fetchStripeProductById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
