import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABQWqB3P50-XZb_B9iiKxVQmUQ6EoAjeY",
  authDomain: "fir-auth-demo-4991b.firebaseapp.com",
  projectId: "fir-auth-demo-4991b",
  storageBucket: "fir-auth-demo-4991b.firebasestorage.app",
  messagingSenderId: "730737087341",
  appId: "1:730737087341:web:6bc747f3b60034113e8064",
  measurementId: "G-655H6FK694",
  // IMPORTANT for Realtime Database:
  databaseURL: "https://fir-auth-demo-4991b-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth
const auth = getAuth(app);
auth.language = 'en';
const provider = new GoogleAuthProvider();

// Database
const db = getDatabase(app);

// Login button handler (if on index.html)
const googleLogin = document.getElementById('google-login-btn');
if (googleLogin) {
  googleLogin.addEventListener("click", async () => {
    try {
      await signInWithPopup(auth, provider);
      window.location.href = "pages/dashboard.html";
    } catch (error) {
      console.error(error);
      alert("Login failed. Please try again.");
    }
  });
}

export { app, auth, db };
