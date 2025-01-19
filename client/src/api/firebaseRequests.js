import { collection, getDocs } from "firebase/firestore/lite";
import { db } from "../firebaseConfig";

export const getProducts = async () => {
  const productsCol = collection(db, "products");
  const productsSnapshot = await getDocs(productsCol);
  const productList = productsSnapshot.docs.map((doc) => doc.data());
  return productList;
};

export const getProductById = async (id) => {
  getProducts().then((data) => {
    return data.filter((product) => product.id === id)[0];
  });
};

