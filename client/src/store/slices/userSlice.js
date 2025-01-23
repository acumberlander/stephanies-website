import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  decrementProductQuantity,
  emptyCart,
  incrementProductQuantity,
  removeProductFromCart,
} from "../cartThunks/cartThunks";
import {
  createOrder,
  createUser,
  fetchUserByUid,
} from "../userThunks/userThunks";
import { userModel } from "../../Models/User";

const userSlice = createSlice({
  name: "user",
  initialState: userModel,
  reducers: {
    /**
     * @param state
     * @param action.payload
     */
    setUserIds(state, action) {
      state._id = action.payload._id;
      state.uid = action.payload.uid;
    },
  },
  extraReducers: (builder) => {
    builder

      // createUser
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        Object.assign(state, action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // fetchUser
      .addCase(fetchUserByUid.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserByUid.fulfilled, (state, action) => {
        state.status = "succeeded";
        Object.assign(state, action.payload);
      })
      .addCase(fetchUserByUid.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload.error || action.payload;
      })

      // addToCart
      .addCase(addToCart.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        // Update state.cart with new cart data
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // emptyCart
      .addCase(emptyCart.pending, (state, action) => {
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(emptyCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
      })
      .addCase(emptyCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // decrementProductQuantity
      .addCase(decrementProductQuantity.pending, (state, action) => {
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(decrementProductQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
      })
      .addCase(decrementProductQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "failed";
      })

      // incrementProductQuantity
      .addCase(incrementProductQuantity.pending, (state, action) => {
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(incrementProductQuantity.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
      })
      .addCase(incrementProductQuantity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // removeProuctFromCart
      .addCase(removeProductFromCart.pending, (state, action) => {
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(removeProductFromCart.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = {
          cart_items: action.payload.cart_items,
          total_items: action.payload.total_items,
          subtotal: action.payload.subtotal,
        };
      })
      .addCase(removeProductFromCart.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // createOrder
      .addCase(createOrder.pending, (state, action) => {
        state.status = "loading";
        state.error = action.payload;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.cart = action.payload.cart;
        state.orders = action.payload.orders;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});
export const { setUserIds } = userSlice.actions;

export default userSlice.reducer;
