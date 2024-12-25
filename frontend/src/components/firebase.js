import { initializeApp } from "firebase/app";
import {getStorage} from  'firebase/storage';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyDaTpHqoI8QBWA0Ci-lZYYWRIPSFFC6GaI",
  authDomain: "watch-video-45073.firebaseapp.com",
  projectId: "watch-video-45073",
  storageBucket: "watch-video-45073.firebasestorage.app",
  messagingSenderId: "1061160117595",
  appId: "1:1061160117595:web:8b31e6bda13cc3f566667e",
  measurementId: "G-FYJDEPC18R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
