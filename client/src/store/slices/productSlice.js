import { createSlice } from "@reduxjs/toolkit";
import { getAllProducts, getProductById } from "../productThunks/productThunks";

const productSlice = createSlice({
  name: "products",
  initialState: {
    items: [],       
    status: "idle",
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // getAllProducts
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })

      // getProductById
      .addCase(getProductById.pending, (state) => {
        state.status = "loading"
        state.error = null
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.current = action.payload
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.payload
      })
  }
})

export default productSlice.reducer
