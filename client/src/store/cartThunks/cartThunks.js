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
      // Updates mongoDB cart
      await axios.put(`/api/users/${uid}/cart`, {
        cart_items: [],
        total_items: 0,
        subtotal: 0,
      });

      // Updates redux user cart state
      return {
        cart_items: [],
        total_items: 0,
        subtotal: 0,
      };
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
  async ({ uid, product, quantity }, { getState, rejectWithValue }) => {
    try {
      // Get the current user state from Redux
      const { user } = getState();
      const { cart_items } = user.cart;

      // Clone existing cart items
      const newCartItems = [...cart_items];

      // Check if this exact product is already in the cart
      const index = newCartItems.findIndex((item) => {
        return item.id === product.id;
      });

      if (index !== -1) {
        // Already in cart: just bump quantity
        newCartItems[index] = {
          ...newCartItems[index],
          quantity: newCartItems[index].quantity + quantity,
        };
      } else {
        // Not in cart yet: push new item
        newCartItems.push({ ...product, quantity });
      }

      // Recalculate totals based on newCartItems
      const newTotalItems = newCartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
      const newSubtotal = newCartItems.reduce(
        (sum, item) => sum + item.quantity * item.price,
        0
      );

      // Update mongoDB cart
      await axios.put(`/api/users/${uid}/cart`, {
        cart_items: newCartItems,
        total_items: newTotalItems,
        subtotal: newSubtotal,
      });

      // Return the updated cart data
      return {
        cart_items: newCartItems,
        total_items: newTotalItems,
        subtotal: newSubtotal,
      };
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
  "user/incrementProductQuantity",
  async (product, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      const newCartItems = [...user.cart.cart_items];

      // Find the product in the cart
      const index = newCartItems.findIndex((item) => {
        return item.id === product.id;
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

      // Updates mongoDB cart
      await axios.put(`/api/users/${user.uid}/cart`, {
        cart_items: newCartItems,
        total_items,
        subtotal,
      });

      // Updates redux user cart state
      return {
        cart_items: newCartItems,
        total_items,
        subtotal,
      };
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
  "user/decrementProductQuantity",
  async (product, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      let newCartItems = [...user.cart.cart_items];

      // Find the product in the cart
      const index = newCartItems.findIndex((item) => {
        return item.id === product.id;
      });

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

      // Updates mongoDB cart
      await axios.put(`/api/users/${user.uid}/cart`, {
        cart_items: newCartItems,
        total_items,
        subtotal,
      });

      // Updates redux user cart state
      return {
        cart_items: newCartItems,
        total_items,
        subtotal,
      };
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
  async (product, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();
      let newCartItems = [...user.cart.cart_items];

      // Find the product in the cart
      const index = newCartItems.findIndex((item) => {
        return item.id === product.id;
      });
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

      // Updates mongoDB cart
      await axios.put(`/api/users/${user.uid}/cart`, {
        cart_items: newCartItems,
        total_items,
        subtotal,
      });

      // Updates redux user cart state
      return {
        cart_items: newCartItems,
        total_items,
        subtotal,
      };
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);
