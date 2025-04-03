import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  signInWithPopup,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile
} from "firebase/auth";
import { auth, googleProvider, db } from "../../firebase/firebaseConfig";
import { setUserIds, setAuthenticated, setAdmin } from "../slices/userSlice";
import { userModel } from "../../Models/User";
import { _createUser, _fetchUserByUid } from "../../api/mongoRequests";
import { _createStripeCustomer } from "../../api/stripeRequests";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

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
        isAuthenticatied: true,
        isAdmin: false,
      };

      // Remove guest user from localStorage when authenticated
      localStorage.removeItem("guestUser");

      _fetchUserByUid(googleUser.uid)
        .then((existingUser) => {
          // Step 2: Set Redux state
          dispatch(
            setUserIds({
              ...existingUser,
              ...googleUser.cart,
            })
          );
          dispatch(setAuthenticated(true));
          if (existingUser.isAdmin === "true") {
            dispatch(setAdmin(true));
          } else {
            dispatch(setAdmin(false));
          }
          toast(`Welcome back, ${name.split(" ")[0]}!`);

          return {
            ...existingUser,
            ...googleUser.cart,
          };
        })
        .catch((err) => {
          // if user not found in mongoDB
          if (err) {
            // Create Stripe customer
            _createStripeCustomer({
              email: googleUser.email,
              name: `${googleUser.firstName} ${googleUser.lastName}`.trim()
            }).then(stripeCustomer => {
              // Add stripeCustomerId to user data
              const userWithStripe = {
                ...googleUser,
                stripeCustomerId: stripeCustomer.id
              };
              
              // create the user in mongoDB
              _createUser(userWithStripe)
                .then((newUser) => {
                  // Step 2: Set Redux state
                  dispatch(setUserIds(newUser));
                  dispatch(setAuthenticated(true));
                  toast(`Welcome, ${name.split(" ")[0]}!`);

                  return newUser;
                });
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

      // Create Stripe customer
      const stripeCustomer = await _createStripeCustomer({
        email,
        name: `${firstName} ${lastName}`.trim()
      });

      // Prepare user data for MongoDB
      const userData = {
        uid: user.uid,
        email,
        firstName,
        lastName,
        stripeCustomerId: stripeCustomer.id
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

// Update User Profile
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (userData, { getState }) => {
    try {
      const { user } = getState();
      const currentUser = auth.currentUser;
      
      if (!currentUser) {
        throw new Error("No authenticated user found");
      }
      
      // Update Firebase profile
      await updateProfile(currentUser, {
        displayName: userData.displayName || user.displayName
      });
      
      // Update Firestore document
      const userRef = doc(db, "users", user._id);
      await updateDoc(userRef, {
        displayName: userData.displayName || user.displayName,
        phoneNumber: userData.phoneNumber || user.phoneNumber
      });
      
      toast.success("Profile updated successfully");
      
      return {
        displayName: userData.displayName || user.displayName,
        phoneNumber: userData.phoneNumber || user.phoneNumber
      };
    } catch (error) {
      console.error("Profile Update Error:", error);
      toast.error("Failed to update profile");
      throw error;
    }
  }
);
