import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
import { getStorage } from "firebase/storage"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2Bz9kTvn_50W0Us2srPGXh5SBw3NZGcM",
  authDomain: "online-shop-3b115.firebaseapp.com",
  projectId: "online-shop-3b115",
  storageBucket: "online-shop-3b115.appspot.com",
  messagingSenderId: "206557709679",
  appId: "1:206557709679:web:35e04d492184f1a5a4d49a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// init services
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { db, auth, storage }