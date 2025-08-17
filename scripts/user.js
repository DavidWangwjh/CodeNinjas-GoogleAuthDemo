import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { app, auth } from "./firebase.js";

function updateUserProfile(user){
    const nameElement = document.getElementById("user-name");
    const emailElement = document.getElementById("user-email");
    const imgElement = document.getElementById("user-profile-picture");

    if (nameElement)  nameElement.textContent = user.displayName || "(no name)";
    if (emailElement) emailElement.textContent = user.email || "";
    if (imgElement) {
        imgElement.alt = user.displayName || "Profile photo";
        if (user.photoURL) {
            imgElement.src = user.photoURL;
        } else {
            imgElement.removeAttribute("src"); // no image available
        }
    }
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        updateUserProfile(user);
        const uid = user.uid;
        return uid;
    }
})

const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await signOut(auth);
            // After signing out, send them back to login
            window.location.href = "../index.html";
        } catch (err) {
            console.error("Error signing out:", err);
            alert("Failed to sign out. Try again.");
        }
    });
}