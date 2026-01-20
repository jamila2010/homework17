import { useEffect, useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { userApp } from "../zustand";

export function useAuth() {
  const setUser = userApp((state) => state.setLogReg);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = ({
    email,
    displayName,
    password,
    photoURL,
    gender,
    age,
  }) => {
    setLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        updateProfile(user, { displayName, photoURL, gender, age }).then(() => {
          const newUser = { ...user, displayName, photoURL, gender, age };
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
  const logout = () => {};

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    });
  }, []);

  return { register, login, logout, loading, error };
}
