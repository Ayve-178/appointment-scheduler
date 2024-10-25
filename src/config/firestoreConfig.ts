import {
  doc,
  setDoc,
  getDocs,
  collection,
  addDoc,
  query,
  where,
  orderBy,
  startAt,
  endAt,
} from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { Appointment } from "../types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const createNewUser = async (uid: string, username: string) => {
  await setDoc(doc(db, "users", uid), {
    uid: uid,
    username: username,
  });
};

export const getAllUsers = async () => {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users = querySnapshot.docs.map((doc) => doc.data());
  return users;
};

export const searchUsers = async (term: string) => {
  try {
    const usersRef = collection(db, "users");
    const q = query(
      usersRef,
      orderBy("username"),
      startAt(term),
      endAt(term + "\uf8ff")
    );
    const querySnapshot = await getDocs(q);

    const usersList = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return usersList;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
};

export const getUsernameByUid = async (uid: string) => {
  const usersRef = collection(db, "users");
  const q = query(usersRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    const doc = querySnapshot.docs[0];
    return doc.data().username;
  }
  return null;
};

export const createAppointment = async (appointmentData: Appointment) => {
  await addDoc(collection(db, "appointments"), {
    ...appointmentData,
    createdAt: new Date(),
  });
};

export const uploadAudioFile = async (file:File) => {
  const audioRef = ref(storage, `audio/${file.name}`);
  const snapshot = await uploadBytes(audioRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);

  return downloadURL;
}

export const getAppointmentsByCondition = async (
  category: string,
  uid: string
) => {
  const q = query(
    collection(db, "appointments"),
    where("status", "==", category),
    where("uid", "==", uid)
  );

  const querySnapshot = await getDocs(q);

  const appointments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  console.log("----------doc---", appointments);
  return appointments;
};

