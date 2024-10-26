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
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "./firebaseConfig";
import { Appointment } from "../types";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
 
const sortAppointments = (appointments: any[]) => {
  return appointments.sort((a, b) => {
    const dateComparison = a.date.toDate().getTime() - b.date.toDate().getTime();
 
    if (dateComparison !== 0) return dateComparison;
 
    const timeA = new Date(`1970-01-01T${a.time}:00`).getTime();
    const timeB = new Date(`1970-01-01T${b.time}:00`).getTime();
 
    return timeA - timeB;
  });
};
 
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
 
export const uploadAudioFile = async (file: File) => {
  const audioRef = ref(storage, `audio/${file.name}`);
  const snapshot = await uploadBytes(audioRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
 
  return downloadURL;
};
 
export const getPastSessions = async (username: string) => {
  const currentTime = Timestamp.fromDate(new Date());
 
  let q = query(
    collection(db, "appointments"),
    where("schedulerName", "==", username),
    where("endTime", "<", currentTime)
  );
 
  let querySnapshot = await getDocs(q);
  const scheduledAppointments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
 
  q = query(
    collection(db, "appointments"),
    where("holderName", "==", username),
    where("endTime", "<", currentTime)
  );
 
  querySnapshot = await getDocs(q);
  const receivedAppointments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
 
  const pastSessions = [...scheduledAppointments, ...receivedAppointments];
 
  return sortAppointments(pastSessions);
};
 
export const getScheduledSessions = async (username: string) => {
  const currentTime = Timestamp.fromDate(new Date());
 
  let q = query(
    collection(db, "appointments"),
    where("schedulerName", "==", username),
    where("endTime", ">", currentTime),
    where("status", "==", "accepted")
  );
 
  let querySnapshot = await getDocs(q);
  const scheduledAppointments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
 
  q = query(
    collection(db, "appointments"),
    where("holderName", "==", username),
    where("endTime", ">", currentTime),
    where("status", "==", "accepted")
  );
 
  querySnapshot = await getDocs(q);
  const receivedAppointments = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
 
  const scheduledSessions = [...scheduledAppointments, ...receivedAppointments];
 
  return sortAppointments(scheduledSessions);
};
 
export const getReceivedInvitations = async (username: string) => {
  const currentTime = Timestamp.fromDate(new Date());
 
  const q = query(
    collection(db, "appointments"),
    where("holderName", "==", username),
    where("endTime", ">", currentTime)
  );
 
  const querySnapshot = await getDocs(q);
 
  const receivedInvitations = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
 
  return sortAppointments(receivedInvitations);
};
 
export const getSentInvitations = async (username: string) => {
  const currentTime = Timestamp.fromDate(new Date());
 
  const q = query(
    collection(db, "appointments"),
    where("schedulerName", "==", username),
    where("endTime", ">", currentTime)
  );
 
  const querySnapshot = await getDocs(q);
 
  const sentInvitations = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
 
  return sortAppointments(sentInvitations);
};
 
export const updateAppointmentStatusQuery = async (appointmentId: string, updatedStatus: string) => {
 
    const appointmentRef = doc(db, "appointments", appointmentId);
    await updateDoc(appointmentRef, {
      status: updatedStatus
    });
 
    console.log(`Appointment ${appointmentId} status updated to ${updatedStatus}`);
 
};
 
