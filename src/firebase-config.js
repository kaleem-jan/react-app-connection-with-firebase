
import { initializeApp } from "firebase/app";

import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBw9sDLCagfdsrCO4CF94E4NxYJn0MGkP8",
  authDomain: "react-crud-5dd19.firebaseapp.com",
  projectId: "react-crud-5dd19",
  storageBucket: "react-crud-5dd19.appspot.com",
  messagingSenderId: "1042098475812",
  appId: "1:1042098475812:web:5511851c4ad944ff5e19b1",
  measurementId: "G-VE89XW80GW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
