// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG2e9Ly6bCebCazzgVnO9sLOhl-8vut5M",
  authDomain: "ai-trip-planner-18721.firebaseapp.com",
  projectId: "ai-trip-planner-18721",
  storageBucket: "ai-trip-planner-18721.firebasestorage.app",
  messagingSenderId: "261005298020",
  appId: "1:261005298020:web:a34877002553bd7d68d271",
  measurementId: "G-X1MN750XBR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
// const analytics = getAnalytics(app);