// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOI3KIs3b3JvAY4u4ayqxiZXBbOuiSpBU",
  authDomain: "thepollingboothmvp.firebaseapp.com",
  projectId: "thepollingboothmvp",
  storageBucket: "thepollingboothmvp.appspot.com",
  messagingSenderId: "818211599553",
  appId: "1:818211599553:web:6933733322c7ae2b20d040",
  measurementId: "G-D506GYTF0V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore();

export default db; 