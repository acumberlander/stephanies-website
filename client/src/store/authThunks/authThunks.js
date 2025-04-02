import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth, googleProvider } from "../../firebase/firebaseConfig";
import { createUser, fetchUserByUid } from "../userThunks/userThunks";
import { setUserIds, setAuthenticated } from "../slices/userSlice";
import { userModel } from "../../Models/User";
import { _createUser, _fetchUserByUid } from "../../api/mongoRequests";
import { toast } from "react-toastify";

// Google Sign-In
export const signInWithGoogle = createAsyncThunk(
  "auth/signInWithGoogle",
  async (_, { dispatch, getState }) => {
    let name;
    try {
      // Authenticate with Google
      const { user } = await signInWithPopup(auth, googleProvider);
      name = user.displayName;
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

      // Remove guest user from localStorage when authenticated
      localStorage.removeItem("guestUser");

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
          toast(`Welcome back, ${name.split(" ")[0]}!`);

          return {
            ...existingUser,
            ...googleUser.cart,
          };
        })
        .catch((err) => {
          // if user not found in mongoDB
          if (err) {
            // create the user in mongoDB
            dispatch(createUser(googleUser))
              .unwrap()
              .then((newUser) => {
                // Step 2: Set Redux state
                dispatch(setUserIds(newUser));
                dispatch(setAuthenticated(true));
                toast(`Welcome back, ${name.split(" ")[0]}!`);

                return newUser;
              });
          }
        });
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      return { error: "Unable to sign in with Google at this time." };
    }
  }
);

export const signInWithEmail = createAsyncThunk(
  "user/signInWithEmail",
  async ({ email, password }) => {
    try {
      // Authenticate with Firebase
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Remove guest user from localStorage when authenticated
      localStorage.removeItem("guestUser");

      // Fetch user from MongoDB
      const response = await _fetchUserByUid(user.uid);

      toast(`Welcome back, ${response.firstName || 'User'}!`);
      return response;
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        return { error: "No account found with this email." };
      } else if (error.code === "auth/invalid-credential") {
        return { error: "Invalid credentials." };
      }

      return { error: "Unable to sign in with email at this time." };
    }
  }
);
// Email & Password registration
export const registerWithEmail = createAsyncThunk(
  "auth/registerWithEmail",
  async ({ email, password, firstName, lastName }) => {
    try {
      // Create user in Firebase
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Prepare user data for MongoDB
      const userData = {
        uid: user.uid,
        email,
        firstName,
        lastName,
      };

      // Remove guest user from localStorage when authenticated
      localStorage.removeItem("guestUser");

      // Send data to backend
      const mongoUser = await _createUser(userData);

      toast(`Welcome, ${firstName}!`);

      return mongoUser;
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        return { error: "An account already exists with this email." };
      }
      return { error: "Unable to register with email at this time." };
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
      JSON.stringify({ ...userModel, _id: null, uid: null })
    );
    dispatch(setUserIds({ _id: null, uid: null }));
    dispatch(setAuthenticated(false));
    toast("See you next time!");
    return null;
  }
);
