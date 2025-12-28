import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { createUserProfile } from "../services/user.services";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true); // 🔹 important

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        try {
          // Create Firestore profile if it doesn't exist
          await createUserProfile({
            uid: user.uid,
            email: user.email,
            role: "staff", // default role
          });

          // Fetch the Firestore doc after creation
          const userDocSnap = await getDoc(doc(db, "users", user.uid));
          setUserRole(userDocSnap.exists() ? userDocSnap.data().role : "staff");
        } catch (err) {
          console.error("Failed to create or fetch user profile:", err);
          setUserRole("staff"); // fallback
        }
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }

      setLoading(false); // ✅ important to signal Auth ready
    });

    return () => unsubscribe();
  }, []);

  const value = { currentUser, userRole, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
