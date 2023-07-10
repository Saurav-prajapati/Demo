
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: "AIzaSyAehvyefRrBW_S3FVLk1GwxFVU0ZK0N2xg",
  authDomain: "keep-notes-d3f50.firebaseapp.com",
  projectId: "keep-notes-d3f50",
  storageBucket: "keep-notes-d3f50.appspot.com",
  messagingSenderId: "291626981843",
  appId: "1:291626981843:web:c84cb46d4a9bc650863726",
  measurementId: "G-6YKMLP1Y7L",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
// const analytics = getAnalytics(app);
const provider= new GoogleAuthProvider();
export {auth,provider};