import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDsnF_W2XWj6GrUlnf26iIInW6ljoKtlX0",
  authDomain: "control-pizzas.firebaseapp.com",
  projectId: "control-pizzas",
  storageBucket: "control-pizzas.firebasestorage.app",
  messagingSenderId: "529272359605",
  appId: "1:529272359605:web:4166dd3fa94873dee04cfc",
  measurementId: "G-QBSBMPDBXW"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);