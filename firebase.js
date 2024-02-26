
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

//username admin@ncc.com //pwd:password
// const firebaseConfig = {
//   apiKey: "AIzaSyCAg6cWE3raoftbVNoyIqTumlaozjI2S04",
//   authDomain: "ncc-manage.firebaseapp.com",
//   databaseURL: "https://ncc-manage-default-rtdb.firebaseio.com",
//   projectId: "ncc-manage",
//   storageBucket: "ncc-manage.appspot.com",
//   messagingSenderId: "377008618778",
//   appId: "1:377008618778:web:b24c33f8cc7ae5c0a400a3",
//   measurementId: "G-15Q0HF7E4D"
// };

//username a@gmail.com //pwd:123123
const firebaseConfig = {
  apiKey: "AIzaSyArdMbwbg9B9hYB8UndlksBFRwiWY_-Tzc",
  authDomain: "nccdb-35c3a.firebaseapp.com",
  databaseURL: "https://nccdb-35c3a-default-rtdb.firebaseio.com",
  projectId: "nccdb-35c3a",
  storageBucket: "nccdb-35c3a.appspot.com",
  messagingSenderId: "810942646892",
  appId: "1:810942646892:web:4396b6200b0a7dbe9b2649"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);