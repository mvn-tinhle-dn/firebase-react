import { db } from "../firebase/firebase-config";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "@firebase/firestore/lite";

const productCollect = collection(db, "products");
const typeCollect = collection(db, "types");

const addProduct = (newProduct) => {
  return addDoc(productCollect, newProduct);
};
const updateProduct = (id, updateProduct) => {
  const productDoc = doc(db, "products", id);
  return updateDoc(productDoc, updateProduct);
};
const deleteProduct = (id) => {
  const productDoc = doc(db, "products", id);
  return deleteDoc(productDoc);
};
const getAllProducts = () => {
  return getDocs(productCollect);
};
const getAllTypes = () => {
  return getDocs(typeCollect);
};
const getProduct = (id) => {
  const productDoc = doc(db, "products", id);
  return getDoc(productDoc);
};

export {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  getAllTypes,
};
