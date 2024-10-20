import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const createNewUser = async (uid: string, username: string) => {
  await setDoc(doc(db, "users", uid), {
    username: username,
  });
};

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map(doc => doc.data());
    return users;
  };
