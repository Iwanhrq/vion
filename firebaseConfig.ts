import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {
  apiKey: "AIzaSyBaXBky2EXQqHw4HNLUjHuc-d4Bc1DIs0A",
  authDomain: "vion-122fe.firebaseapp.com",
  projectId: "vion-122fe",
  storageBucket: "vion-122fe.firebasestorage.app",
  messagingSenderId: "520622495385",
  appId: "1:520622495385:web:2ee9264e30b896471fca08"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app) 