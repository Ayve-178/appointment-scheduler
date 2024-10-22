import { doc, setDoc, getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface Appointment {
  schedulerUid: string;
  holderUid: string;
  title: string;
  description: string;
  date: string;
  time: string;
  audioFileUrl: string;
  createdAt?: Date;
}

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

export const createAppointment = async (appointmentData: Appointment) => {
  await addDoc(collection(db, "appointments"), {
    ...appointmentData,
    createdAt: new Date(),
  })
}
