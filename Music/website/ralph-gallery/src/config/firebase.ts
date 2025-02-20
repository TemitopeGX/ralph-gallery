import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBbCLBrtfJ9pJlOv-iVwIzS1hDF1VACRcA",
  authDomain: "ralph-gallery.firebaseapp.com",
  projectId: "ralph-gallery",
  storageBucket: "ralph-gallery.firebasestorage.app",
  messagingSenderId: "914464858493",
  appId: "1:914464858493:web:40bd22f402979634b02c14",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
