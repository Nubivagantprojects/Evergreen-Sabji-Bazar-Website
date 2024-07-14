// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyCyQlCoz24uneDDBhvItcxfCcklwPJxP1s",
  authDomain: "freshgreenery-9a32b.firebaseapp.com",
  databaseURL: "https://freshgreenery-9a32b-default-rtdb.firebaseio.com",
  projectId: "freshgreenery-9a32b",
  storageBucket: "freshgreenery-9a32b.appspot.com",
  messagingSenderId: "236507358182",
  appId: "1:236507358182:web:3a94b5cf385e2b14c36c27",
  measurementId: "G-VERY8P93C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Get Firebase Authentication instance
export const auth = getAuth(app);
export { db, storage,app };

