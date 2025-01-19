import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore/lite";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { setCookie } from "./helpers/helpers";

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

// Initialize Database
export const db = getFirestore(app);

export const signInAsGuest = async () => {
  try {
    const auth = getAuth();
    const userCredential = await signInAnonymously(auth);

    // The `user` object now represents an anonymous/guest user
    const user = userCredential.user;
    console.log("Signed in as guest with UID:", user.uid);

    // Check to see if cookie exists for user
    if (!document.cookie.includes("__sx_guest_cust")) {
      setCookie("__sx_guest_cust", user.uid, 30);
      const userDocRef = doc(db, "users", user.uid);
      const userData = {
        visitedSite: new Date(),
        userId: user.uid,
        isGuest: true,
        cart: [],
      };
      await setDoc(userDocRef, userData, { merge: true });
    }
    // You can now use `user.uid` to store data, etc.
  } catch (error) {
    console.error("Error signing in as guest:", error);
  }
};

/* 
TODO: Figure out the proper way to dynamically retrieve and plug in images from firebase storage.

Currently only using the storageRef as a means to get the urls for each picture in storage 
and then copying those urls into their own array. This is demonstrated in the Services 
file at the very beginning of the function. Would work on this quicker, but I'm cautious of my
bandwidth limit.
*/

// Storage reference that points to the root directory of firebase storage service
export const storageRef = ref(storage);
