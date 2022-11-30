// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFireStore} from "@firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCeVvZkME2wZ6GJFubhZS7rveuBbRa2DPQ",
  authDomain: "kinder-62bb8.firebaseapp.com",
  projectId: "kinder-62bb8",
  storageBucket: "kinder-62bb8.appspot.com",
  messagingSenderId: "240384976741",
  appId: "1:240384976741:web:ffd32e351db2119bc8e38c",
  measurementId: "G-38W4VG7QTF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const fireStore = getFireStore(app)