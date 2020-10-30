import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCGZ1u_h28mJ2wpe4MJsULhKaM8IFRTfZQ",
    authDomain: "hotspot-c9099.firebaseapp.com",
    databaseURL: "https://hotspot-c9099.firebaseio.com",
    projectId: "hotspot-c9099",
    storageBucket: "hotspot-c9099.appspot.com",
    messagingSenderId: "548123257077",
    appId: "1:548123257077:web:66b71c6ed9c3473a967dbc",
    measurementId: "G-0496MTEPVC"
};

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export {
    database,
    googleAuthProvider,
    firebase
}