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
      .addCase(emptyCart.pending, (state, action) => {
        state.error = action.payload;
        state.status = "loading";
      })
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
      .addCase(decrementProductQuantity.pending, (state, action) => {
        state.error = action.payload;
        state.status = "loading";
      })
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
        state.status = "failed";
      })

      // incrementProductQuantity
      .addCase(incrementProductQuantity.pending, (state, action) => {
        state.error = action.payload;
        state.status = "loading";
      })
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
      .addCase(removeProductFromCart.pending, (state, action) => {
        state.error = action.payload;
        state.status = "loading";
      })
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
      .addCase(createOrder.pending, (state, action) => {
        state.error = action.payload;
        state.status = "loading";
      })
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
export const { setUserIds } = userSlice.actions;

export default userSlice.reducer;
