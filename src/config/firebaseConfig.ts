import { initializeApp } from "firebase/app";
import{getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.FS_API_KEY,
  authDomain: import.meta.env.FS_AUTH_DOMAIN,
  projectId: import.meta.env.FS_PROJECT_ID,
  storageBucket: import.meta.env.FS_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FS_MESSAGING_SENDER_ID,
  appId: import.meta.env.FS_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
