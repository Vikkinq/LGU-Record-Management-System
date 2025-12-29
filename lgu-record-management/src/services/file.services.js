// 1. CONSOLIDATED IMPORTS
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  serverTimestamp 
} from "firebase/firestore";
import { storage, db } from "../firebase/firebase";

// --- UPLOAD FILE (Storage) ---
export const uploadFileToStorage = async (file, category) => {
  try {
    const uniqueFileName = `${Date.now()}-${file.name}`;
    const storageRef = ref(storage, `${category}/${uniqueFileName}`);
    
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { downloadURL, fileName: uniqueFileName };
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

// --- SAVE RECORD (Database) ---
export const saveFileRecord = async (fileData, user) => {
  try {
    const docRef = await addDoc(collection(db, "documents"), {
      fileName: fileData.fileName,
      originalName: fileData.originalName,
      fileUrl: fileData.fileUrl,
      fileType: fileData.fileType,
      fileSize: fileData.fileSize,
      category: fileData.category,
      
      number: fileData.number,       
      title: fileData.title,         
      date: fileData.date,           
      sponsor: fileData.sponsor,     
      committee: fileData.committee, 
      expiryDate: fileData.expiryDate || null,

      uploadedBy: user.uid,
      uploaderEmail: user.email,
      uploadedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error saving document record:", error);
    throw error;
  }
};

// --- UPDATE RECORD (Database) ---
export const updateFileRecord = async (docId, updatedData, user) => {
  try {
    const docRef = doc(db, "documents", docId);
    
    // Create the base update object with text fields
    const dataToUpdate = {
      category: updatedData.category,
      number: updatedData.number,
      title: updatedData.title,
      date: updatedData.date,
      sponsor: updatedData.sponsor,
      committee: updatedData.committee,
      expiryDate: updatedData.expiryDate || null,
      lastUpdatedBy: user.uid,
      lastUpdatedAt: serverTimestamp(),
    };

    // IF a new file was uploaded, add those details to the update
    if (updatedData.fileUrl) {
      dataToUpdate.fileUrl = updatedData.fileUrl;
      dataToUpdate.fileName = updatedData.fileName;
      dataToUpdate.fileType = updatedData.fileType;
      dataToUpdate.fileSize = updatedData.fileSize;
    }

    await updateDoc(docRef, dataToUpdate);
    return true;
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};