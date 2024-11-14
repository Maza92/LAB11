import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "",
  authDomain: "N",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const itemsCollection = collection(db, "items");

export const addItem = async (item: { name: string; description: string }) => {
  return await addDoc(itemsCollection, item);
};

export const getItems = async () => {
  const snapshot = await getDocs(itemsCollection);
  return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
};

export const updateItem = async (id: string, item: Partial<{ name: string; description: string }>) => {
  const itemDoc = doc(db, "items", id);
  return await updateDoc(itemDoc, item);
};

export const deleteItem = async (id: string) => {
  const itemDoc = doc(db, "items", id);
  return await deleteDoc(itemDoc);
};
