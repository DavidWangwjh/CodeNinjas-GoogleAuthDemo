import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAV5E-62HCydu85AGHZAxIfF5Sux4rbE48",
    authDomain: "codeninjas-auth-demo.firebaseapp.com",
    projectId: "codeninjas-auth-demo",
    storageBucket: "codeninjas-auth-demo.firebasestorage.app",
    messagingSenderId: "781068340605",
    appId: "1:781068340605:web:e0abf65c2c173a127c5014"
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