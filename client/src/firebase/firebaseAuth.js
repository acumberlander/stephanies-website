import { signInAnonymouslyToFirebase } from "../firebase/firebaseConfig";

/**
 * Signs user into firebase anonymously by creating a user object and returns
 * that user's uid.
 * @returns uid
 */
export const createFirebaseUid = async () => {
  const { user } = await signInAnonymouslyToFirebase();
  return user.uid;
};
