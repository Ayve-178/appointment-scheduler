import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { createNewUser } from "../config/firestoreConfig";

interface AuthContextType {
  currentUser: User | null;
  login: (username: string, password: string) => Promise<UserCredential>;
  register: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) =>
      setCurrentUser(user)
    );
    return () => unsubscribe();
  }, []);

  const register = async (username: string, password: string) => {
    const userEmail = `${username}@myemail.com`;
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      userEmail,
      password
    );
    const user = userCredential.user;
    console.log(user);

    await createNewUser(user.uid, username);
  };
  
  const login = (username: string, password: string) => {
    const userEmail = `${username}@myemail.com`;
    return signInWithEmailAndPassword(auth, userEmail, password);
  };

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
