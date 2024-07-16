// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDjjy9okA4zLvDhXlVgV2JnNVEWh0n0q3Q",
  // authDomain: "freshgreenery-9a32b.firebaseapp.com",
  // databaseURL: "https://freshgreenery-9a32b-default-rtdb.firebaseio.com",
  projectId: "evergreen-sabji-bazar",
  storageBucket: "gs://evergreen-sabji-bazar.appspot.com",
  messagingSenderId: "236507358182",
  appId: "1:899294455155:android:78721a3bc10285e6901106",
  // measurementId: "G-VERY8P93C7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Get Firebase Authentication instance
export const auth = getAuth(app);
export { db, storage,app };

