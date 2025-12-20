/**
 * Document Model
 * Represents a stored Resolution or Ordinance file
 *
 * @typedef {Object} DocumentRecord
 * @property {string} fileId - Firestore document ID
 * @property {string} fileName - Original file name
 * @property {string} fileType - MIME type (application/pdf, etc.)
 * @property {number} fileSize - File size in bytes
 * @property {string} fileUrl - Firebase Storage download URL
 * @property {"resolution" | "ordinance"} category - Document category
 * @property {string} uploadedBy - UID or email of uploader
 * @property {string} uploadedAt - Upload timestamp (ISO string)
 * @property {string} createdAt - Record creation timestamp (ISO string)
 */
export const DocumentModel = {
  fileId: "",
  fileName: "",
  fileType: "",
  fileSize: 0,
  fileUrl: "",
  category: "",
  uploadedBy: "",
  uploadedAt: "",
  createdAt: "",
};
