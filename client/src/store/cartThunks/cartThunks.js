import { createAsyncThunk } from "@reduxjs/toolkit";
import { doc, updateDoc, getDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";

/**
 * Adds an item to the user's cart in firebase/firestore and in redux
 * @param uid
 */
export const addToCart = createAsyncThunk(
  "user/addToCart",
  async ({ uid, product, quantity }, { rejectWithValue }) => {
    if (!uid) {
      return rejectWithValue("User is not signed in.");
    }

    try {
      // TODO: replace firebase web sdk for the firebase admin adk.
      // Want to abstract this logic to node backend.
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        return rejectWithValue("User doc not found.");
      }

      const userData = userSnap.data();
      const { cart } = userData;
      let { cart_items, total_items, subtotal } = cart;

      // Check if product already in cart
      const existingProductIndex = cart_items.findIndex(
        (item) => item.id === product.id
      );

      if (existingProductIndex >= 0) {
        // Increase quantity
        cart_items[existingProductIndex].quantity += quantity;
      } else {
        // Add new product with quantity
        cart_items.push({ ...product, quantity: quantity });
      }

      // Update total items, subtotal
      total_items += quantity;
      subtotal += quantity * product.price;

      // Write updated data back to Firestore
      await updateDoc(userRef, {
        cart: {
          cart_items,
          total_items,
          subtotal,
        },
      });

      // Return new cart data (for Redux)
      return {
        cart_items,
        total_items,
        subtotal,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Empties user's cart in firebase/firestore as well as in redux state
 * @param uid
 */
export const emptyCart = createAsyncThunk(
  "user/emptyCart",
  async ({ uid }, { rejectWithValue }) => {
    if (!uid) {
      return rejectWithValue("User is not signed in.");
    }

    try {
      // Get user data from firebase/firestore
      const userRef = doc(db, "users", uid);

      // Write emptied cart back to Firestore
      await updateDoc(userRef, {
        cart: {
          cart_items: [],
          total_items: 0,
          subtotal: 0,
        },
      });

      // Return emptied cart data (for Redux)
      return {
        cart_items: [],
        total_items: 0,
        subtotal: 0,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Increases quantity of a product the user's cart by 1 in firebase/firestore as well as in redux state
 * @param uid
 * @param productId
 */
export const incrementProductQuantity = createAsyncThunk(
  "user/incrementProductQuantity",
  async ({ uid, product }, { rejectWithValue }) => {
    if (!uid) {
      return rejectWithValue("User is not signed in.");
    }

    try {
      // Get user data from firebase/firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        return rejectWithValue("User doc not found.");
      }
      const userData = userSnap.data();
      const { cart } = userData;
      let { cart_items, total_items, subtotal } = cart;

      // Find the index of the product
      const productIndex = cart_items.findIndex((item) => {
        return item.id === product.id;
      });

      // Filter for selected product
      const selectedProduct = cart_items[productIndex];

      // Increment product quantity and total item count
      selectedProduct.quantity += 1;
      total_items += 1;

      // Recalculate subtotal
      let newSubtotal = 0;
      for (let item of cart_items) {
        newSubtotal += item.price * item.quantity;
      }
      subtotal = newSubtotal;

      // Write updated data back to Firestore
      await updateDoc(userRef, {
        cart: {
          cart_items,
          total_items,
          subtotal,
        },
      });

      // Return new cart data (for Redux)
      return {
        cart_items,
        total_items,
        subtotal,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Decreases quantity of a product the user's cart by 1 in firebase/firestore as well as in redux state
 * @param uid
 * @param productId
 */
export const decrementProductQuantity = createAsyncThunk(
  "user/decrementProductQuantity",
  async ({ uid, product }, { rejectWithValue }) => {
    if (!uid) {
      return rejectWithValue("User is not signed in.");
    }

    try {
      // Get user data from firebase/firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        return rejectWithValue("User doc not found.");
      }

      const userData = userSnap.data();
      let { cart } = userData;
      let { cart_items, total_items, subtotal } = cart;

      // Find the index of the product
      const productIndex = cart_items.findIndex((item) => {
        return item.id === product.id;
      });

      // Filter for selected product
      const selectedProduct = cart_items[productIndex];

      // Decrement product quantity and total item count
      selectedProduct.quantity -= 1;
      total_items -= 1;
      
      // Recalculate subtotal
      let newSubtotal = 0;
      for (let item of cart_items) {
        newSubtotal += item.price * item.quantity;
      }
      subtotal = newSubtotal;

      // Check if this is the last item
      if (selectedProduct.quantity <= 0) {
        // Remove product from cart
        if (productIndex !== -1) {
          cart_items.splice(productIndex, 1);
        }
      }

      // Write updated data back to Firestore
      await updateDoc(userRef, {
        cart: {
          cart_items,
          total_items,
          subtotal,
        },
      });

      // Return new cart data (for Redux)
      return {
        cart_items,
        total_items,
        subtotal,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

/**
 * Removes a product from the user's cart in firebase/firestore as well as in redux state
 * @param uid
 * @param productId
 */
export const removeProductFromCart = createAsyncThunk(
  "user/removeProductFromCart",
  async ({ uid, product }, { rejectWithValue }) => {
    if (!uid) {
      return rejectWithValue("User is not signed in.");
    }

    try {
      // Get user data from firebase/firestore
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        return rejectWithValue("User doc not found.");
      }

      const userData = userSnap.data();
      let { cart } = userData;
      let { cart_items, total_items, subtotal } = cart;

      const productIndex = cart_items.findIndex((item) => {
        return item.id === product.id;
      });
      // Remove product from cart
      if (productIndex !== -1) {
        cart_items.splice(productIndex, 1);
      }
      total_items -= 1;

      // Recalculate subtotal
      let newSubtotal = 0;
      for (let item of cart_items) {
        newSubtotal += item.price * item.quantity;
      }
      subtotal = newSubtotal;

      // Write updated data back to Firestore
      await updateDoc(userRef, {
        cart: {
          cart_items,
          total_items,
          subtotal,
        },
      });

      // Return new cart data (for Redux)
      return {
        cart_items,
        total_items,
        subtotal,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
