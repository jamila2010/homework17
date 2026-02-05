import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  getAuth,
  signOut,
} from "firebase/auth";
import { userApp } from "../zustand";

export function useAuth() {
  const [authLoading, setAuthLoading]= useState(true)
  const setUser = userApp((state) => state.setLogReg);
  const setIsUser = userApp((state) => state.setIsUser);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = ({
    email,
    displayName,
    password,
    photoURL,
    // gender,
    // age,
  }) => {
    console.log(displayName)
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password, displayName)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName, photoURL }).then(() => {
          const newUser = { ...user, displayName, photoURL };
          setUser(newUser);
        });
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const login = ({ email, password }) => {
    setLoading(true);
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setUser(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const logout = () => {
    setLoading(true);
    signOut(auth)
      .then(() => {
        toast.success("See you soon!");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(errorMessage);
        console.log(errorCode);
      });
  };

  useEffect(() => {
   
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);  
      } else {
        setUser(null);
      }
      setIsUser();
      setAuthLoading(false)
    });
    return unsubscribe
  }, []);

  return { register, login, logout, loading, error, authLoading };
}
