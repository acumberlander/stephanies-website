import { fetchUserByUid } from "../store/userThunks/userThunks";
import { getAuth } from "firebase/auth";
import {
  setUserIds,
  setAuthenticated,
  setGuestUser,
} from "../store/slices/userSlice";
import { fetchAllStripeProducts } from "../store/productThunks/productThunks";
import { userModel } from "../Models/User";

/**
 * Initializes the app:
 * - If a user is authenticated via Firebase, fetch user from MongoDB.
 * - If no user is authenticated, load or create a guest user in local storage.
 */
export const initializeApp = async (dispatch) => {
  const auth = getAuth();
  const firebaseUser = auth.currentUser; // Firebase only for authentication

  if (firebaseUser) {
    try {
      const uid = firebaseUser.uid;
      const user = await dispatch(fetchUserByUid(uid)).unwrap();

      if (user && user._id) {
        dispatch(setUserIds(user));
        dispatch(setAuthenticated(true)); // Authenticated user
      }
    } catch (error) {
      console.warn("User not found in MongoDB. User must sign up first.");
    }
  } else {
    // Handle guest user
    const storedGuestUser = JSON.parse(localStorage.getItem("guestUser"));

    if (!storedGuestUser || !storedGuestUser._id) {
      // Create new guest user
      const newGuestUser = { ...userModel, _id: "guest", uid: "guest" };
      localStorage.setItem("guestUser", JSON.stringify(newGuestUser));
      dispatch(setGuestUser(newGuestUser));
    } else {
      dispatch(setGuestUser(storedGuestUser));
    }

    dispatch(setAuthenticated(false)); // Guest user
  }

  dispatch(fetchAllStripeProducts());
};
