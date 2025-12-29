import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";
import MainContent from "../components/Main/MainContent";
import AddRecordDialog from "../components/Modal/AddRecordModal";

// 1. IMPORT EDIT MODAL & UPDATE SERVICE
import EditRecordModal from "../components/Modal/EditRecordModal"; 
import { uploadFileToStorage, saveFileRecord, updateFileRecord } from "../services/file.services";

export default function MainPage() {
  const { currentUser } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({ ordinances: true, resolutions: true });
  const [activeMenu, setActiveMenu] = useState("ordinances");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Add Record State
  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  // 2. ADD EDIT RECORD STATE
  const [showEditRecordDialog, setShowEditRecordDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  // Handle Add (Your existing code)
  const handleAddRecord = async (formData) => {
    if (!currentUser) {
      alert("You must be logged in to upload!");
      return;
    }

    setIsUploading(true);
    
    try {
      const { category, files, number, title, date, sponsor, committee, expiryDate } = formData;

      for (const file of files) {
        const { downloadURL, fileName } = await uploadFileToStorage(file, category);
        
        await saveFileRecord({
          fileName,
          originalName: file.name,
          fileUrl: downloadURL,
          fileType: file.type,
          fileSize: file.size,
          category,
          number,
          title,
          date,
          sponsor,
          committee,
          expiryDate
        }, currentUser);
      }
      
      alert("Record added successfully!");
      setShowAddRecordDialog(false);
      
    } catch (error) {
      console.error(error);
      alert("Failed to upload records.");
    } finally {
      setIsUploading(false);
    }
  };

  // 3. HANDLE EDIT CLICK (From Table Pencil Icon)
  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setShowEditRecordDialog(true);
  };

  // 4. HANDLE UPDATE SUBMIT (From Edit Modal)
const handleUpdateRecord = async (docId, updatedData) => {
    if (!currentUser) return;
    setIsUpdating(true);

    try {
      let finalData = { ...updatedData };

      // 1. CHECK: Did the user provide a NEW file?
      if (updatedData.newFile) {
        
        // A. Upload the new file to Storage
        const { downloadURL, fileName } = await uploadFileToStorage(
          updatedData.newFile, 
          updatedData.category
        );

        // B. Add new file details to the update object
        finalData.fileUrl = downloadURL;
        finalData.fileName = fileName;
        finalData.fileType = updatedData.newFile.type;
        finalData.fileSize = updatedData.newFile.size;


      }

      // 2. Remove the raw "newFile" object so we don't try to save it to Firestore
      delete finalData.newFile;

      // 3. Update Database
      await updateFileRecord(docId, finalData, currentUser);
      
      alert("Record updated successfully!");
      setShowEditRecordDialog(false);
      setSelectedRecord(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update record.");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={sidebarOpen}
        onAddRecord={() => setShowAddRecordDialog(true)}
      />

      <div className="flex flex-col flex-1">
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setFilters={setFilters}
          filters={filters}
        />

        {/* 5. Pass onEdit to MainContent */}
        <MainContent 
            searchQuery={searchQuery} 
            sortBy={sortBy} 
            filters={filters} 
            activeMenu={activeMenu} 
            onEdit={handleEditClick} // <--- Passed down here
        />

        {showAddRecordDialog && (
          <AddRecordDialog
            isOpen={showAddRecordDialog}
            onClose={() => setShowAddRecordDialog(false)}
            onSubmit={handleAddRecord}
            isLoading={isUploading} 
          />
        )}

        {/* 6. RENDER EDIT MODAL */}
        {showEditRecordDialog && (
          <EditRecordModal
            isOpen={showEditRecordDialog}
            onClose={() => setShowEditRecordDialog(false)}
            onUpdate={handleUpdateRecord}
            record={selectedRecord}
            isLoading={isUpdating}
          />
        )}
      </div>
    </div>
  );
}