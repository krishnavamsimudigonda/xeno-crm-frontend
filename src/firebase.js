// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// ✅ Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAiz-Wbks_xDEd0kaqvAg6fttMOt27Jl8k",
  authDomain: "xeno-crm-b49ae.firebaseapp.com",
  projectId: "xeno-crm-b49ae",
  storageBucket: "xeno-crm-b49ae.appspot.com",
  messagingSenderId: "664350780236",
  appId: "1:664350780236:web:6498453093304449893de9"
};

// ✅ Initialize Firebase and export
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { app, auth, provider };