import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getAuth } from "firebase/auth";

export const uploadImageToFirebase = async (file) => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) throw new Error("User not authenticated");

  const storage = getStorage();
  const fileRef = ref(storage, `images/${file.name}-${Date.now()}`);
  await uploadBytes(fileRef, file);

  const downloadURL = await getDownloadURL(fileRef);
  return downloadURL;
};
