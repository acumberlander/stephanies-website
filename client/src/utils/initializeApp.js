import { fetchUserByUid } from "../store/userThunks/userThunks";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";
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

  try {
    // Set Firebase authentication persistence to local storage
    await setPersistence(auth, browserLocalPersistence);
    console.log("Firebase auth persistence set to local.");
  } catch (error) {
    console.error("Error setting Firebase persistence:", error);
  }

  const firebaseUser = auth.currentUser; // Firebase only for authentication

  if (firebaseUser) {
    try {
      const uid = firebaseUser.uid;
      const user = await dispatch(fetchUserByUid(uid)).unwrap();

      if (user && user._id) {
        dispatch(setUserIds(user));
        dispatch(setAuthenticated(true));
      }
    } catch (error) {
      console.warn("User not found in MongoDB. User must sign up first.");
    }
  } else {
    // Handle guest user
    const storedGuestUser = JSON.parse(localStorage.getItem("guestUser"));

    if (!storedGuestUser || !storedGuestUser.uid) {
      // Create new guest user
      const newGuestUser = {
        ...userModel,
        uid: `guest-${crypto.randomUUID()}`,
      };
      localStorage.setItem("guestUser", JSON.stringify(newGuestUser));
      dispatch(setGuestUser(newGuestUser));
    } else {
      dispatch(setGuestUser(storedGuestUser));
    }
    dispatch(setAuthenticated(false));
  }
  dispatch(fetchAllStripeProducts());
};
