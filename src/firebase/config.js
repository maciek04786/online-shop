import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCd0iUACWCErE012YuVxLqYQB-kkqNMbYE",
  authDomain: "online-shop-21632.firebaseapp.com",
  projectId: "online-shop-21632",
  storageBucket: "online-shop-21632.appspot.com",
  messagingSenderId: "891163753455",
  appId: "1:891163753455:web:64b1d1bd6feee77399141a"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// init services
const db = getFirestore()
const auth = getAuth()
const storage = getStorage()

export { db, auth, storage }