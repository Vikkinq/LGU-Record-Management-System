import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

/**
 * Creates a user profile in Firestore if it doesn't exist yet
 * @param {Object} input
 * @param {string} input.uid - Firebase Auth UID
 * @param {string} input.email - user email
 * @param {"admin" | "staff"} [input.role] - default "staff"
 */
export const createUserProfile = async (input) => {
  if (!input.uid || !input.email) {
    throw new Error("Missing required user fields");
  }

  const userRef = doc(db, "users", input.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: input.uid,
      email: input.email,
      role: input.role || "staff",
      createdAt: serverTimestamp(),
    });
  }
};

export const getUserProfile = async (uid) => {
  try {
    const userRef = doc(db, "users", uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      return { id: userSnap.id, ...userSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};
