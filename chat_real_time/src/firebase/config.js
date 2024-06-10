import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup, connectAuthEmulator } from 'firebase/auth';
import { connectFirestoreEmulator, getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyBEK0rDmxG3wxAb7zwwdlUgODC6r8wwCYU",
    authDomain: "chat-app-aef11.firebaseapp.com",
    projectId: "chat-app-aef11",
    storageBucket: "chat-app-aef11.appspot.com",
    messagingSenderId: "662167489892",
    appId: "1:662167489892:web:f1ad1d4f7b8ffda346fe71",
    measurementId: "G-4DEZJNE1PX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);
// Initialize Firestore
const db = getFirestore(app);

if (window.location.hostname === 'localhost') {
    connectAuthEmulator(auth, 'http://127.0.0.1:9099');
    connectFirestoreEmulator(db, 'localhost', 8080);
}
// Export the necessary elements
export { auth, FacebookAuthProvider, signInWithPopup, db };