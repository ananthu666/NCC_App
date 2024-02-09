// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD6LkmVDmvKDJ2yMcLa5zY2w4HiJx4slvM",
  authDomain: "ncc-cadet-management.firebaseapp.com",
  projectId: "ncc-cadet-management",
  storageBucket: "ncc-cadet-management.appspot.com",
  messagingSenderId: "499997837033",
  appId: "1:499997837033:web:e0705c86200b023e9a9278",
  measurementId: "G-CLV9N3WER0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
