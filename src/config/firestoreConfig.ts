import { doc, setDoc, getDocs, collection, addDoc, query, orderBy, startAt, endAt } from "firebase/firestore";
import { db } from "./firebaseConfig";
import { Appointment } from "../types";

export const createNewUser = async (uid: string, username: string) => {
  await setDoc(doc(db, "users", uid), {
    uid: uid,
    username: username,
  });
};

export const getAllUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const users = querySnapshot.docs.map(doc => doc.data());
    return users;
};

export const searchUsers = async (term: string) => {
  try {
    const usersRef = collection(db, 'users');
    const q = query(
      usersRef,
      orderBy('username'), 
      startAt(term),
      endAt(term + '\uf8ff')
    );
    const querySnapshot = await getDocs(q);

    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return usersList;
  } catch (error) {
    console.error('Error searching users:', error);
    return [];
  }
};


export const createAppointment = async (appointmentData: Appointment) => {
  await addDoc(collection(db, "appointments"), {
    ...appointmentData,
    createdAt: new Date(),
  })
}
