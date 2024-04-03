// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCUFOnQRgL9kCLxPrVxjWz5DkTA8qkt96Q",
    authDomain: "mytrack-c89d7.firebaseapp.com",
    projectId: "mytrack-c89d7",
    storageBucket: "mytrack-c89d7.appspot.com",
    messagingSenderId: "1067940509068",
    appId: "1:1067940509068:web:c05821b95e76024ded92a9"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app)
export { app, auth, firestore};



