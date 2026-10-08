import { createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider,
} from "firebase/auth";
import useAxiosPublic from "../hooks/useAxiosPublic";

export const AuthContext = createContext(null);
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const axiosPublic = useAxiosPublic();
  const googleProvider = new GoogleAuthProvider();

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const googleLogIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const updateUserProfile = async (name, photo) => {
    await updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
    setUser({
      ...auth.currentUser,
      uid: auth.currentUser.uid,
      email: auth.currentUser.email,
      displayName: name,
      photoURL: photo,
    });
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        const userInfo = { email: currentUser.email };
        try {
          const res = await axiosPublic.post("/jwt", userInfo);
          if (res.data.token) {
            localStorage.setItem("access-token", res.data.token);
          }
        } catch (error) {
          console.log(error);
        }
      } else {
        localStorage.removeItem("access-token");
      }

      setLoading(false);
    });
    return () => unSubscribe();
  }, [axiosPublic]);

  const authInfo = {
    user,
    loading,
    createUser,
    logIn,
    logOut,
    updateUserProfile,
    googleLogIn,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
