import { createAsyncThunk } from "@reduxjs/toolkit";
import { signInAnonymouslyToFirebase, db } from "../../firebaseConfig";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore/lite";

export const signInUser = createAsyncThunk(
  "user/signInUser",
  async (_, { rejectWithValue }) => {
    try {
      // TODO: replace firebase web sdk for the firebase admin adk.
      // Want to abstract this logic to node backend.
      const { user } = await signInAnonymouslyToFirebase();
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          cart: {
            cart_items: [],
            total_items: 0,
            subtotal: 0,
          },
          orders: [],
        });
        return {
          uid: user.uid,
          cart: {
            cart_items: [],
            total_items: 0,
            subtotal: 0,
          },
          orders: [],
        };
      } else {
        const userData = userSnap.data();
        const { orders, cart } = userData;
        let { cart_items, total_items, subtotal } = cart;
        return {
          uid: user.uid,
          cart: {
            cart_items,
            total_items,
            subtotal,
          },
          orders,
        };
      }
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const createOrder = createAsyncThunk(
  "user/createOrder",
  async ({ uid, orderData }, { rejectWithValue }) => {
    try {
      if (!uid) {
        return rejectWithValue("User is not signed in");
      }
      // TODO: replace firebase web sdk for the firebase admin adk.
      // Want to abstract this logic to node backend.
      const userRef = doc(db, "users", uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) {
        return rejectWithValue("User doc not found.");
      }

      const userData = userSnap.data();
      let { orders } = userData;

      // Add orderData to orders array
      if (!orders) {
        orders = [orderData];
      } else {
        orders.push(orderData);
      }

      // Write updated data back to Firestore
      await updateDoc(userRef, {
        cart: {
          cart_items: [],
          total_items: 0,
          subtotal: 0,
        },
        orders,
      });

      // Return emptied cart data (for Redux)
      return {
        cart: {
          cart_items: [],
          total_items: 0,
          subtotal: 0,
        },
        orders,
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);
