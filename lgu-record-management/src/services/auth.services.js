import { auth, db } from "../firebase/firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";

export const registerUser = async (email, password, fullName, role = "staff") => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Create Firestore profile if not exists
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      email,
      fullName,
      role,
      provider: "email",
      createdAt: serverTimestamp(),
    });
  }

  return user;
};

export const loginWithEmail = async (email, password) => {
  const userCredentials = await signInWithEmailAndPassword(auth, email, password);
  return userCredentials.user;
};

export const logoutUser = async () => {
  try {
    if (!window.confirm("Are you sure you want to logout?")) return;
    await signOut(auth);
  } catch (err) {
    console.error("Logout failed:", err);
    alert("Cannot logout");
  }
};
