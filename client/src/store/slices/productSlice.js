import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAllProducts,
  fetchProductById,
  fetchAllStripeProducts,
  fetchStripeProductById,
} from "../productThunks/productThunks";

const productSlice = createSlice({
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
// const productSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     status: "idle",
//     error: null,
//   },
//   reducers: {},
//   extraReducers: (builder) => {
//     // getAllProducts
//     builder
//       .addCase(fetchAllProducts.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchAllProducts.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.items = action.payload;
//       })
//       .addCase(fetchAllProducts.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       })

//       // getProductById
//       .addCase(fetchProductById.pending, (state) => {
//         state.status = "loading";
//         state.error = null;
//       })
//       .addCase(fetchProductById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.current = action.payload;
//       })
//       .addCase(fetchProductById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.payload;
//       });
//   },
// });

export default productSlice.reducer;
