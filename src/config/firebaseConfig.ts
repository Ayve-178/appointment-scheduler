import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDi6S6v_2kB1h0puDiHsbAyvtMTX11YsNY",
  authDomain: "appointment-scheduler-48fc1.firebaseapp.com",
  projectId: "appointment-scheduler-48fc1",
  storageBucket: "appointment-scheduler-48fc1.appspot.com",
  messagingSenderId: "9396066846",
  appId: "1:9396066846:web:ee826225dedf102c492c0f"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
