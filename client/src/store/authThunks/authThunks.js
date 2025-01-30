import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { createUser, fetchUserByUid } from "../userThunks/userThunks";
import { setUserIds, setAuthenticated } from "../slices/userSlice";
import { emptyCart } from "../cartThunks/cartThunks";
import { userModel } from "../../Models/User";

// Google Sign-In
export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { dispatch, getState, rejectWithValue }) => {
    try {
      // Authenticate with Google
      const { user } = await signInWithPopup(auth, googleProvider);

      // Get current guest cart from Redux state
      const guestCart = getState().user.cart || {
        cart_items: [],
        total_items: 0,
        subtotal: 0,
      };

      const googleUser = {
        uid: user.uid,
        email: user.email,
        firstName: user.displayName.split(" ")[0] || "",
        lastName: user.displayName.split(" ")[1] || "",
        cart: guestCart,
        orders: [],
      };

      dispatch(fetchUserByUid(googleUser.uid))
        .unwrap()
        .then((existingUser) => {
          // Step 2: Set Redux state
          dispatch(
            setUserIds({
              ...existingUser,
              ...googleUser.cart,
            })
          );
          dispatch(setAuthenticated(true));

          return {
            ...existingUser,
            ...googleUser.cart,
          };
        })
        .catch((err) => {
          if (err) {
            dispatch(createUser(googleUser))
              .unwrap()
              .then((newUser) => {
                // Step 2: Set Redux state
                dispatch(setUserIds(newUser));
                dispatch(setAuthenticated(true));
                return newUser;
              });
          }
        });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Email & Password Sign-In
export const signInWithEmail = createAsyncThunk(
  "auth/signInWithEmail",
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("result: ", result);
      // Get current guest cart from Redux state
      // const guestCart = getState().user.cart || {
      //   cart_items: [],
      //   total_items: 0,
      //   subtotal: 0,
      // };

      // const googleUser = {
      //   uid: user.uid,
      //   email: user.email,
      //   firstName: user.displayName.split(" ")[0] || "",
      //   lastName: user.displayName.split(" ")[1] || "",
      //   cart: guestCart,
      //   orders: [],
      // };

      // dispatch(fetchUserByUid(googleUser.uid))
      //   .unwrap()
      //   .then((existingUser) => {
      //     // Step 2: Set Redux state
      //     dispatch(
      //       setUserIds({
      //         ...existingUser,
      //         ...googleUser.cart,
      //       })
      //     );
      //     dispatch(setAuthenticated(true));

      //     return {
      //       ...existingUser,
      //       ...googleUser.cart,
      //     };
      //   })
      //   .catch((err) => {
      //     if (err) {
      //       dispatch(createUser(googleUser))
      //         .unwrap()
      //         .then((newUser) => {
      //           // Step 2: Set Redux state
      //           dispatch(setUserIds(newUser));
      //           dispatch(setAuthenticated(true));
      //           return newUser;
      //         });
      //     }
      //   });
    } catch (error) {
      console.error("Email Sign-In Error:", error);
      return rejectWithValue(error.message);
    }
  }
);

// Sign-Out
export const signOutUser = createAsyncThunk(
  "auth/signOutUser",
  async (_, { dispatch }) => {
    await signOut(auth);
    localStorage.setItem(
      "guestUser",
      JSON.stringify({ ...userModel, _id: "guest", uid: "guest" })
    );
    dispatch(setUserIds({ _id: null, uid: null }));
    dispatch(setAuthenticated(false));
    return null;
  }
);
