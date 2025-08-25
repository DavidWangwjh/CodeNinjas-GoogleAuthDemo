import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { auth } from "./firebase.js";

function updateUserProfile(user) {
  const nameElement = document.getElementById("user-name");
  const emailElement = document.getElementById("user-email");
  const imgElement = document.getElementById("user-profile-picture");

  if (nameElement)  nameElement.textContent = user.displayName || "(no name)";
  if (emailElement) emailElement.textContent = user.email || "";
  if (imgElement) {
    imgElement.alt = user.displayName || "Profile photo";
    if (user.photoURL) imgElement.src = user.photoURL;
  }
}

// Guard + profile
onAuthStateChanged(auth, (user) => {
  const onDashboard = window.location.pathname.endsWith("pages/dashboard.html");

  if (user) {
    // If we are on dashboard, fill profile:
    if (onDashboard) updateUserProfile(user);
  } else {
    // If not logged in and on dashboard, redirect to login
    if (onDashboard) {
      window.location.href = "../index.html";
    }
  }
});

// Logout button
const logoutBtn = document.getElementById("logout-btn");
if (logoutBtn) {
  logoutBtn.addEventListener("click", async () => {
    try {
      await signOut(auth);
      window.location.href = "../index.html";
    } catch (err) {
      console.error("Error signing out:", err);
      alert("Failed to sign out. Try again.");
    }
  });
}
