import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth"

const config = {
    apiKey: "AIzaSyBniEQ_IMht4tlLWOUjg9e4THLRK4-3jsA",
    authDomain: "timemanager-c7d49.firebaseapp.com",
    projectId: "timemanager-c7d49",
    storageBucket: "timemanager-c7d49.appspot.com",
    messagingSenderId: "872972852759",
    appId: "1:872972852759:web:a870a9a84f26cf8d6d0652",
    measurementId: "G-9Z76HR6VTE"
}

firebase.initializeApp(config)

const DB = firebase.firestore();
const usersCollection = DB.collection('users');

export {
    firebase,
    usersCollection
}