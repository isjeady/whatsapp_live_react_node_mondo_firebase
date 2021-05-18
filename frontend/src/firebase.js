import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBrS7RJRHZy3LYRpUcNrGjxQM2B4nsxkOY",
    authDomain: "ws-live-e4735.firebaseapp.com",
    projectId: "ws-live-e4735",
    storageBucket: "ws-live-e4735.appspot.com",
    messagingSenderId: "186776446559",
    appId: "1:186776446559:web:0c2cbd16425c72c4241dea",
    measurementId: "G-B0WZH39QYF"
};

// Initialize Firebase
const firebaseApp = firebase.initializeApp(firebaseConfig);

const auth = firebaseApp.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth,provider}