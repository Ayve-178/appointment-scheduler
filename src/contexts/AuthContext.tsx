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
  loading: boolean; // Added loading to context
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
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false); // Stop loading once Firebase completes user check
    });
    return () => unsubscribe();
  }, []);

  const getErrorMessage = (code: string) => {
    switch (code) {
      case "auth/weak-password":
        return "Password should be at least 6 characters.";
      case "auth/email-already-in-use":
        return "Username already exists.";
      case "auth/invalid-email":
        return "Please enter a valid username.";
      case "auth/user-not-found":
        return "User not found.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      default:
        return "An error occurred. Please try again.";
    }
  };

  const register = async (username: string, password: string) => {
    try {
      const userEmail = `${username}@myemail.com`;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userEmail,
        password
      );
      const user = userCredential.user;
      await createNewUser(user.uid, username);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const userEmail = `${username}@myemail.com`;
      return await signInWithEmailAndPassword(auth, userEmail, password);
    } catch (error: any) {
      throw new Error(getErrorMessage(error.code));
    }
  };

  const logout = () => signOut(auth);

  if (loading) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <AuthContext.Provider
      value={{ currentUser, login, register, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
