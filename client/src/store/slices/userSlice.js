import { createSlice } from "@reduxjs/toolkit";
import {
  addToCart,
  decrementProductQuantity,
  emptyCart,
  incrementProductQuantity,
  removeProductFromCart,
} from "../cartThunks/cartThunks";
import { createUser, fetchUserByUid } from "../userThunks/userThunks";
import {
  signInWithGoogle,
  signInWithEmail,
  signOutUser,
  registerWithEmail,
  updateUserProfile,
} from "../authThunks/authThunks";
import { userModel } from "../../Models/User";

const userSlice = createSlice({
  name: "user",
  initialState: userModel,
  reducers: {
    setUserIds(state, action) {
      state._id = action.payload._id;
      state.uid = action.payload.uid;
      state.isAuthenticated = true;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    setGuestUser(state, action) {
      return { ...state, ...action.payload, isAuthenticated: false };
    },
    updateGuestUser(state, action) {
      Object.assign(state, action.payload);
      localStorage.setItem("guestUser", JSON.stringify(state)); // Update local storage on state change
    },
    setAdmin(state, action) {
      state.isAdmin = action.payload;
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

      // Google Sign In
      .addCase(signInWithGoogle.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
      })

      // Register with Email
      .addCase(registerWithEmail.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      // Register with Email
      .addCase(registerWithEmail.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      // Register with Email
      .addCase(registerWithEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Email/password Sign In
      .addCase(signInWithEmail.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      // Email/password Sign In
      .addCase(signInWithEmail.fulfilled, (state, action) => {
        Object.assign(state, action.payload);
        state.isAuthenticated = true;
        state.status = "succeeded";
      })
      // Email/password Sign In
      .addCase(signInWithEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })

      // Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        state.isAuthenticated = false;
        state.isAdmin = false; // Reset admin status
        state.uid = null;
        state._id = null;
        // Reset cart state
        state.cart = {
          cart_items: [],
          total_items: 0,
          subtotal: 0
        };
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
        state.error =
          action.payload?.error ||
          action.error?.message ||
          "Unknown error occurred";
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

      // Add this to the extraReducers
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.displayName = action.payload.displayName;
        state.phoneNumber = action.payload.phoneNumber;
      })
      .addCase(updateUserProfile.rejected, (state) => {
        state.status = 'failed';
      });
  },
});
export const { setUserIds, setAuthenticated, setGuestUser, updateGuestUser, setAdmin } =
  userSlice.actions;

export default userSlice.reducer;
