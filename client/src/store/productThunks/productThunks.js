// src/store/productSlice.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, doc, getDocs, getDoc } from "firebase/firestore/lite";
import { db } from "../../firebaseConfig";

// Thunk to fetch all products
export const getAllProducts = createAsyncThunk(
  "products/getAllProducts",
  async (_, { rejectWithValue }) => {
    try {
      // TODO: replace firebase web sdk for the firebase admin adk.
      // Want to abstract this logic to node backend.
      const colRef = collection(db, "products")
      const snapshot = await getDocs(colRef)

      const products = []
      snapshot.forEach((docSnap) => {
        products.push({ id: docSnap.id, ...docSnap.data() })
      });

      return products
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)

// Thunk to fetch a single product by ID
export const getProductById = createAsyncThunk(
  "products/getProductById",
  async (productId, { rejectWithValue }) => {
    try {
      const docRef = doc(db, "products", productId)
      const docSnap = await getDoc(docRef)
      if (!docSnap.exists()) {
        throw new Error("Product not found")
      }
      return { id: docSnap.id, ...docSnap.data() }
    } catch (err) {
      return rejectWithValue(err.message)
    }
  }
)