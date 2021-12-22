import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
// import "firebase/messaging";

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
firebase.firestore().settings({ experimentalForceLongPolling: true })
const DB = firebase.firestore();
const usersCollection = DB.collection('users');
// firebase.messaging().getToken({
//     vapidKey: 'BIlER_JrA_VdHgVN2w9MJBUxso2wAhQfLDYaxOZEvUdggmMQ0azX_qLOHDE_CGrqVF4i_tjuwZo8mgneDdUbysI'})
//     .then((currentToken) => {
//     if (currentToken) {
//         // Send the token to your server and update the UI if necessary
//         // ...
//     } else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//         // ...
//     }
// }).catch((err) => {
//     console.log('An error occurred while retrieving token. ', err);
//     // ...
// });


export {
    firebase,
    usersCollection,
}
