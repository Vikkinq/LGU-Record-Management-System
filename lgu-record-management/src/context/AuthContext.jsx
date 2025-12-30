import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { createUserProfile, getUserProfile } from "../services/user.services";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setLoading(true);

      if (user) {
        setCurrentUser(user);

        try {
          // Ensure Firestore profile exists
          await createUserProfile({
            uid: user.uid,
            email: user.email,
            role: "staff",
          });

          // Fetch Firestore user
          const profile = await getUserProfile(user.uid);
          setUserProfile(profile);
        } catch (err) {
          console.error("AuthContext error:", err);
          setUserProfile(null);
        }
      } else {
        setCurrentUser(null);
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        userProfile,
        userRole: userProfile?.role,
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
