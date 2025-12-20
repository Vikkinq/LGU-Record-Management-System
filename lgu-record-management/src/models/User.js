/**
 * User Profile Model
 * Represents an authenticated user stored in Firestore
 *
 * @typedef {Object} UserProfile
 * @property {string} uid - Firebase Auth UID
 * @property {string} email - User email
 * @property {"admin" | "staff"} role - User role / access level
 * @property {string} createdAt - ISO timestamp of creation
 */
export const UserProfileModel = {
  uid: "",
  email: "",
  role: "staff",
  createdAt: "",
};
