import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  decrementProductQuantity,
  emptyCart,
  incrementProductQuantity,
  removeProductFromCart,
} from "../cartThunks/cartThunks";
import { createOrder, signInUser } from "../userThunks/userThunks";
import { userModel } from "../../Models/User";

const userSlice = createSlice({
  name: "user",
  initialState: userModel,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // signInUser
      .addCase(signInUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.uid = action.payload.uid;
        state.cart = action.payload.cart;
        state.orders = action.payload.orders;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        // Update state.cart with new cart data
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
        state.status = "succeeded";
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // emptyCart
      .addCase(emptyCart.fulfilled, (state, action) => {
        // Update state.cart with emptied cart data
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
        state.status = "succeeded";
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // decrementProductQuantity
      .addCase(decrementProductQuantity.fulfilled, (state, action) => {
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
        state.status = "succeeded";
      })
      .addCase(decrementProductQuantity.rejected, (state, action) => {
        state.error = action.payload;
      })

      // incrementProductQuantity
      .addCase(incrementProductQuantity.fulfilled, (state, action) => {
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
        state.status = "succeeded";
      })
      .addCase(incrementProductQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // removeProuctFromCart
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
        state.status = "succeeded";
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // createOrder
      .addCase(createOrder.fulfilled, (state, action) => {
        state.cart = action.payload.cart;
        state.orders = action.payload.orders;
        state.status = "succeeded";
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      });
  },
});

export default userSlice.reducer;
