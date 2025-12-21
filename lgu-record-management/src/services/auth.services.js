import { auth, db } from "../firebase/firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

// Login function: Signs in AND fetches the user role (Admin vs Staff)
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Check Firestore for the user's role
    const userDoc = await getDoc(doc(db, "users", user.uid));
    let role = "staff"; // Default role if none is found

    if (userDoc.exists()) {
      role = userDoc.data().role;
    }

    return { user, role };
  } catch (error) {
    console.error("Login Error:", error.message);
    throw error;
  }
};

export const logoutUser = () => {
  return signOut(auth);
};
