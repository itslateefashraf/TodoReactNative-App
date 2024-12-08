// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBj7ygX6zTZXniTgTPJ-UkLaqBv7vf7flE",
  authDomain: "todo-30598.firebaseapp.com",
  projectId: "todo-30598",
  storageBucket: "todo-30598.firebasestorage.app",
  messagingSenderId: "515798508759",
  appId: "1:515798508759:web:c07c052b8e134f1394fc92",
  measurementId: "G-M6BCM46QN5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);