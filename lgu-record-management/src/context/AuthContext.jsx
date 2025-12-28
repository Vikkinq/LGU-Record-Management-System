import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user);

        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUserRole(userDoc.exists() ? userDoc.data().role : "staff");
      } else {
        setCurrentUser(null);
        setUserRole(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const value = {
    currentUser,
    userRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
