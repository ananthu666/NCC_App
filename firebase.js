
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAg6cWE3raoftbVNoyIqTumlaozjI2S04",
  authDomain: "ncc-manage.firebaseapp.com",
  databaseURL: "https://ncc-manage-default-rtdb.firebaseio.com",
  projectId: "ncc-manage",
  storageBucket: "ncc-manage.appspot.com",
  messagingSenderId: "377008618778",
  appId: "1:377008618778:web:b24c33f8cc7ae5c0a400a3",
  measurementId: "G-15Q0HF7E4D"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);