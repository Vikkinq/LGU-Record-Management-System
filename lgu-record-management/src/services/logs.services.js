import { addDoc, collection, getDocs, query, orderBy } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { serverTimestamp } from "firebase/firestore";

export const logActivity = (action, details = {}) => {
  return addDoc(collection(db, "activityLogs"), {
    action,
    performedBy: auth.currentUser?.email ?? "system",
    timestamp: serverTimestamp(),
    ...details,
  });
};

export const fetchActivityLogs = async () => {
  const q = query(collection(db, "activityLogs"), orderBy("timestamp", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
};
