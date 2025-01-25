import { createUser, fetchUserByUid } from "../store/userThunks/userThunks";
import { createFirebaseUid } from "../firebase/firebaseAuth";
import { userModel } from "../Models/User";
import { setUserIds } from "../store/slices/userSlice";
import { fetchAllProducts } from "../store/productThunks/productThunks";

/**
 * Fetches user from mongodb that has a matching uid and then sets
 * mongo's _id property value to the user redux state. If there is no
 * user with a matching uid, then a new user will be created in mongoDB.
 */
export const initializeApp = async (dispatch) => {
  let uid;
  try {
    uid = await createFirebaseUid();

    // Attempt to fetch the user from MongoDB
    const user = await dispatch(fetchUserByUid(uid)).unwrap();

    if (user && user.uid && user._id) {
      // User exists, set _id in Redux
      dispatch(setUserIds(user));
    }
  } catch (error) {
    if (error.error === "User not found") {
      const newMongoUser = await dispatch(createUser({...userModel, uid})).unwrap();
      if (newMongoUser && newMongoUser._id) {
        dispatch(setUserIds(newMongoUser));
      }
    } else {
      console.error("Error fetching user:", error);
    }
  } finally {
    dispatch(fetchAllProducts());
  }
};
