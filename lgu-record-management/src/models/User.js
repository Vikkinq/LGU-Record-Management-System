/**
 * @typedef {Object} UserProfile
 * @property {string} uid - Firebase Auth UID
 * @property {string} email - User email
 * @property {"admin" | "staff"} role - User role / access level
 * @property {any} createdAt - Firestore timestamp
 */
export const UserProfileModel = {
  uid: "",
  email: "",
  role: "staff",
  createdAt: "",
};
