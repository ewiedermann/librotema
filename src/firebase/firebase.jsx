// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBtrGBwQvD8AHP5T1R1XAoVc81dGwBTdfQ",
  authDomain: "librodetema-332a2.firebaseapp.com",
  projectId: "librodetema-332a2",
  storageBucket: "librodetema-332a2.firebasestorage.app",
  messagingSenderId: "673653562187",
  appId: "1:673653562187:web:2d33f52c37c0594230a6ce",
  measurementId: "G-NQ3JBQD0F5"
};

// Initialize Firebase
const db = initializeApp(firebaseConfig);
const analytics = getAnalytics(db);

export { db };