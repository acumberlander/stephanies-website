import { useSelector } from "react-redux";
import { signInAnonymouslyToFirebase } from "../firebase/firebaseConfig";
import {
  getAuth,
  GoogleAuthProvider,
  linkWithCredential,
  EmailAuthProvider,
  signInWithPopup,
} from "firebase/auth";

const auth = getAuth();
const currentUser = auth.currentUser;

/**
 * Signs user into firebase anonymously by creating a user object and returns
 * that user's uid.
 * @returns uid
 */
export const createFirebaseUid = async () => {
  const { user } = await signInAnonymouslyToFirebase();
  return user.uid;
};

/**
 * Converts anonymous Firebase user to credentialed user via Google authorization
 */
export const convertAnonymousToGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Extract credential from the signIn result
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (!credential) {
      throw new Error("GoogleAuthProvider credential is undefined");
    }
    console.log("currentUser: ", currentUser);
    const googleUser = result.user;

    await linkWithCredential(currentUser, credential);

    console.log("Successfully converted anonymous user to Google account");
  } catch (error) {
    if (error.message.includes("auth/provider-already-linked")) {
      return;
    }
  }
};

/**
 * Converts anonymous Firebase user to credentialed user via the user's personal email and password
 * @param {*} email
 * @param {*} password
 */
export const convertAnonymousToEmail = async (
  email,
  password,
  stateUser,
  dispatch
) => {
  try {
    const credential = EmailAuthProvider.credential(email, password);
    const user = await linkWithCredential(currentUser, credential);
    console.log(
      "Successfully converted anonymous user to email/password account",
      user
    );
  } catch (error) {
    console.error(
      "Error converting anonymous user to email/password account",
      error
    );
  }
};
