import { initializeApp } from 'firebase/app';
import { getStorage, ref } from 'firebase/storage'

const firebaseConfig = {
	apiKey: process.env.FIREBASE_API_KEY,
	authDomain: 'sexes-by-stephanie.firebaseapp.com',
	projectId: 'sexes-by-stephanie',
	storageBucket: 'sexes-by-stephanie.appspot.com',
	messagingSenderId: '228491648849',
	appId: '1:228491648849:web:9e313d5c1c3a46fed7bd70',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Storage
const storage = getStorage(app);

/* 
TODO: Figure out the proper way to dynamically retrieve and plug in images from firebase storage.

Currently only using the storageRef as a means to get the urls for each picture in storage 
and then copying those urls into their own array. This is demonstrated in the Services 
file at the very beginning of the function. Would work on this quicker, but I'm cautious of my
bandwidth limit.
*/

// Storage reference that points to the root directory of firebase storage service
export const storageRef = ref(storage);
