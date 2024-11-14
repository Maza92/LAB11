// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA9AOURz5qsMrzuu1wLg1t-Y_uubhlgf5Q",
    authDomain: "laboratorio-75832.firebaseapp.com",
    projectId: "laboratorio-75832",
    storageBucket: "laboratorio-75832.firebasestorage.app",
    messagingSenderId: "793193518803",
    appId: "1:793193518803:web:868414b625386fa456e626",
    measurementId: "G-C3G371MHDZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);