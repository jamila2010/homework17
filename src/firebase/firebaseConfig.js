import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAqHNbTuc_jZuh1MtRz_UYXOQ2-2pEvz10",
  authDomain: "todolist-d85cc.firebaseapp.com",
  projectId: "todolist-d85cc",
  storageBucket: "todolist-d85cc.firebasestorage.app",
  messagingSenderId: "342226990602",
  appId: "1:342226990602:web:0bfa02c4daf34186d351f3",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const auth = getAuth();
export const provider = new GoogleAuthProvider();
