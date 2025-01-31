import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInAnonymously,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage, ref } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage
const storage = getStorage(app);

// Storage reference that points to the root directory of firebase storage service
export const storageRef = ref(storage);

// Initialize Authorization Services
export const auth = getAuth(app);

// Initialize Database Services
export const db = getFirestore(app);

// Auth providers
export const googleProvider = new GoogleAuthProvider();
export { createUserWithEmailAndPassword, signInWithEmailAndPassword };
/**
 * Signs user into firebase anonymously.
 */
export const signInAnonymouslyToFirebase = () => {
  return signInAnonymously(auth);
};
