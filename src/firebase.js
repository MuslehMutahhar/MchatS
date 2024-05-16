
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage, ref } from "firebase/storage";
import { getFirestore } from "firebase/firestore";



const firebaseConfig = {
  apiKey: "AIzaSyA94dDekKoU1BdnoI08UUaZ3SOMddR2D4E",
  authDomain: "chatapp-b2194.firebaseapp.com",
  projectId: "chatapp-b2194",
  storageBucket: "chatapp-b2194.appspot.com",
  messagingSenderId: "821461549020",
  appId: "1:821461549020:web:c4aa77b83f7122ec8d5919"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);

// write: if request.time < timestamp.date(2024, 6, 11)