import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  _addToCart,
  _emptyCart,
  _updateProductQuantity,
  _removeProductFromCart,
} from "../../api/mongoRequests";
import { updateGuestUser } from "../slices/userSlice";

/**
 * Empties the user's cart in MongoDB or local storage.
 */
export const emptyCart = createAsyncThunk(
  "user/emptyCart",
  async (_, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState();
      const emptyCart = {
        cart_items: [],
        total_items: 0,
        subtotal: 0,
      };

      if (user.isAuthenticated) {
        await _emptyCart(user.uid, emptyCart); // MongoDB update
      } else {
        dispatch(updateGuestUser({ cart: emptyCart })); // Update guest user in Redux
      }

      toast("Your cart was emptied!");
      return emptyCart;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Adds a product to the cart in MongoDB or local storage.
 */
export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ product, quantity }, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState();
      const currentCart = user.cart.cart_items || [];

      // Create a new array of cart items
      const newCartItems = currentCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity } // Create a new object for updates
          : item
      );

      // If product is not in cart, add it
      if (!newCartItems.find((item) => item.id === product.id)) {
        newCartItems.push({ ...product, quantity });
      }

      // Calculate new totals
      const newTotalItems = newCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const newSubtotal = newCartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      const updatedCart = {
        cart_items: newCartItems,
        total_items: newTotalItems,
        subtotal: newSubtotal,
      };

      if (user.isAuthenticated) {
        await _addToCart(user.uid, updatedCart); // MongoDB update
      } else {
        dispatch(updateGuestUser({ cart: updatedCart })); // Local storage update
      }

      toast(
        quantity === 1
          ? "Your item has been added to the cart!"
          : "Your items have been added!"
      );

      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Increments a product's quantity in MongoDB or local storage.
 */
export const incrementProductQuantity = createAsyncThunk(
  "user/incrementProductQuantity",
  async (product, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState();
      const newCartItems = user.cart.cart_items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );

      const updatedCart = {
        cart_items: newCartItems,
        total_items: newCartItems.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: newCartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };

      if (user.isAuthenticated) {
        await _updateProductQuantity(user.uid, updatedCart);
      } else {
        dispatch(updateGuestUser({ cart: updatedCart }));
      }

      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Decrements a product's quantity in MongoDB or local storage.
 */
export const decrementProductQuantity = createAsyncThunk(
  "user/decrementProductQuantity",
  async (product, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState();
      let newCartItems = user.cart.cart_items
        .map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0);

      const updatedCart = {
        cart_items: newCartItems,
        total_items: newCartItems.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: newCartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };

      if (user.isAuthenticated) {
        await _updateProductQuantity(user.uid, updatedCart);
      } else {
        dispatch(updateGuestUser({ cart: updatedCart }));
      }

      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Removes a product from the cart in MongoDB or local storage.
 */
export const removeProductFromCart = createAsyncThunk(
  "user/removeFromCart",
  async (product, { getState, dispatch, rejectWithValue }) => {
    try {
      const { user } = getState();
      const newCartItems = user.cart.cart_items.filter(
        (item) => item.id !== product.id
      );

      const updatedCart = {
        cart_items: newCartItems,
        total_items: newCartItems.reduce((acc, item) => acc + item.quantity, 0),
        subtotal: newCartItems.reduce(
          (acc, item) => acc + item.price * item.quantity,
          0
        ),
      };

      if (user.isAuthenticated) {
        await _removeProductFromCart(user.uid, updatedCart);
      } else {
        dispatch(updateGuestUser({ cart: updatedCart }));
      }

      toast("You removed a product from your cart!");
      return updatedCart;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
