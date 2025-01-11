import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBwQHS9ZRp9wqCpM8A7LrE25FV7oIZIoIk",
  authDomain: "shopapp-cb630.firebaseapp.com",
  projectId: "shopapp-cb630",
  storageBucket: "shopapp-cb630.firebasestorage.app",
  messagingSenderId: "464149981308",
  appId: "1:464149981308:web:bb83c2cb33c8a43b7801f9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const authentification = getAuth(app);
const database = getFirestore();

export { authentification, database };