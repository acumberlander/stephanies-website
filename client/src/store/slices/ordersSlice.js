import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _fetchOrdersByUid } from "../../api/mongoRequests";
import { createOrder, fetchOrdersByUid } from "../orderThunks/orderThunks";

const ordersSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Create Order
      .addCase(createOrder.pending, (state, action) => {
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload.orders;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Fetch Orders by UID
      .addCase(fetchOrdersByUid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrdersByUid.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default ordersSlice.reducer;
