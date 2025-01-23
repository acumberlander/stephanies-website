import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

/**
 * Empties user's cart in the database as well as in redux state
 * @param uid
 */
export const emptyCart = createAsyncThunk(
  "user/emptyCart",
  async (uid, { rejectWithValue }) => {
    try {
      // PUT to /api/users/:uid/cart with an empty cart
      const res = await axios.put(`/api/users/${uid}/cart`, {
        cart_items: [],
        total_items: 0,
        subtotal: 0,
      });
      return res.data; // Should be the updated user doc
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Merges a new product into the cart, or increments its quantity if it's already there.
 * @param uid
 * @param product
 */
export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ uid, product }, { getState, rejectWithValue }) => {
    try {
      // Get the current user state from Redux
      const { user } = getState();

      // Clone existing cart items
      const newCartItems = [...user.cart.cart_items];

      // Check if this exact product is already in the cart
      // (match both `id` and `selected_size` if you have multiple size variants)
      const index = newCartItems.findIndex((item) => {
        return (
          item.id === product.id && item.selected_size === product.selected_size
        );
      });

      if (index !== -1) {
        // Already in cart: just bump quantity
        newCartItems[index] = {
          ...newCartItems[index],
          quantity: newCartItems[index].quantity + product.quantity,
        };
      } else {
        // Not in cart yet: push new item
        newCartItems.push(product);
      }

      // Recalculate totals
      const total_items = newCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const subtotal = newCartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // PUT to /api/users/:uid/cart (adjust your route as needed)
      const res = await axios.put(`/api/users/${uid}/cart`, {
        cart_items: newCartItems,
        total_items,
        subtotal,
      });

      // The server should return the updated user doc
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * @param uid
 * @param productId
 * @param selectedSize
 */
export const incrementProductQuantity = createAsyncThunk(
  "user/incrementQuantity",
  async ({ uid, productId, selectedSize }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const newCartItems = [...user.cart.cart_items];

      // Find the product in the cart
      const index = newCartItems.findIndex((item) => {
        return item.id === productId && item.selected_size === selectedSize;
      });

      if (index !== -1) {
        newCartItems[index] = {
          ...newCartItems[index],
          quantity: newCartItems[index].quantity + 1,
        };
      }

      // Recalculate totals
      const total_items = newCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const subtotal = newCartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const res = await axios.put(`/api/users/${uid}/cart`, {
        cart_items: newCartItems,
        total_items,
        subtotal,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * @param uid
 * @param productId
 * @param selectedSize
 */
export const decrementProductQuantity = createAsyncThunk(
  "user/decrementQuantity",
  async ({ uid, productId, selectedSize }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      let newCartItems = [...user.cart.cart_items];

      // Find the product in the cart
      const index = newCartItems.findIndex(
        (item) => item.id === productId && item.selected_size === selectedSize
      );
      if (index !== -1) {
        const currentQty = newCartItems[index].quantity;
        const newQty = currentQty - 1;

        if (newQty > 0) {
          // Just decrement
          newCartItems[index] = {
            ...newCartItems[index],
            quantity: newQty,
          };
        } else {
          // If quantity goes to zero, remove item from cart
          newCartItems.splice(index, 1);
        }
      }

      // Recalculate totals
      const total_items = newCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const subtotal = newCartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      const res = await axios.put(`/api/users/${uid}/cart`, {
        cart_items: newCartItems,
        total_items,
        subtotal,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

/**
 * Removes a product from the user's cart in database as well as in redux state
 * @param uid
 * @param productId
 */
export const removeProductFromCart = createAsyncThunk(
  "user/removeFromCart",
  async ({ uid, productId, selectedSize }, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      let newCartItems = [...user.cart.cart_items];

      // Find the product in the cart
      const index = newCartItems.findIndex(
        (item) => item.id === productId && item.selected_size === selectedSize
      );
      // If found, remove it
      if (index !== -1) {
        newCartItems.splice(index, 1);
      }

      // Recalculate totals
      const total_items = newCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      const subtotal = newCartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );

      // PUT updated cart to the server
      const res = await axios.put(`/api/users/${uid}/cart`, {
        cart_items: newCartItems,
        total_items,
        subtotal,
      });

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
