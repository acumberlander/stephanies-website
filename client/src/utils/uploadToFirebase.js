import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase/firebaseConfig";

export const uploadImageToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(
      storage,
      `product-images/${file.name}-${Date.now()}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      null,
      (error) => reject(error),
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadURL);
      }
    );
  });
};
