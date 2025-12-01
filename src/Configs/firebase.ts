// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDM99q3pO2U7_Got69rzWeQ3O4Jx6var9Q",
  authDomain: "react-ts-movie.firebaseapp.com",
  projectId: "react-ts-movie",
  storageBucket: "react-ts-movie.firebasestorage.app",
  messagingSenderId: "278720678936",
  appId: "1:278720678936:web:bef43aa0c4bf86e96c476d",
  measurementId: "G-13HMHBL9YC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const  auth = getAuth();
const db = getFirestore(app);


export {auth, db}