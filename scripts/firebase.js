import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABQWqB3P50-XZb_B9iiKxVQmUQ6EoAjeY",
  authDomain: "fir-auth-demo-4991b.firebaseapp.com",
  projectId: "fir-auth-demo-4991b",
  storageBucket: "fir-auth-demo-4991b.firebasestorage.app",
  messagingSenderId: "730737087341",
  appId: "1:730737087341:web:6bc747f3b60034113e8064",
  measurementId: "G-655H6FK694"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
auth.language = 'en'
const provider = new GoogleAuthProvider();
const googleLogin = document.getElementById('google-login-btn');

if (googleLogin) {
    googleLogin.addEventListener("click", function(){
        signInWithPopup(auth, provider)
        .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            window.location.href = "pages/dashboard.html"
        }).catch((error) => {
            // Handle Errors here.
        });
    })
}

export { app, auth };