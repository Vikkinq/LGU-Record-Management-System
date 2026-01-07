import { useAuth } from "../context/AuthContext";
import { useState, useEffect, useMemo } from "react";

import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";
import MainContent from "../components/Main/MainContent";

import MobileBottomNav from "../components/layouts/MobileBottomNav";
import MobileSidebar from "../components/layouts/MobileSidebar";

import AddRecordDialog from "../components/Modal/AddRecordModal";
import EditRecordModal from "../components/Modal/EditRecordModal";

import { collection, query, where, orderBy, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../firebase/firebase";

import { uploadFileToStorage, saveFileRecord, updateFileRecord } from "../services/file.services";

export default function MainPage() {
  const { currentUser, userRole } = useAuth();

  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({ ordinances: true, resolutions: true });
  const [activeMenu, setActiveMenu] = useState("ordinances");

  const [documents, setDocuments] = useState([]);
  const [loadingDocs, setLoadingDocs] = useState(true);

  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);
  const [showEditRecordDialog, setShowEditRecordDialog] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);

  const [isUploading, setIsUploading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Mobile UI
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeBottomTab, setActiveBottomTab] = useState("home");

  /* ---------------------- CRUD ---------------------- */

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

        await saveFileRecord(
          {
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
            expiryDate,
          },
          currentUser
        );
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

  const handleEditClick = (record) => {
    setSelectedRecord(record);
    setShowEditRecordDialog(true);
  };

  const handleUpdateRecord = async (docId, updatedData) => {
    if (!currentUser) return;
    setIsUpdating(true);

    try {
      let finalData = { ...updatedData };

      if (updatedData.newFile) {
        const { downloadURL, fileName } = await uploadFileToStorage(updatedData.newFile, updatedData.category);

        finalData.fileUrl = downloadURL;
        finalData.fileName = fileName;
        finalData.fileType = updatedData.newFile.type;
        finalData.fileSize = updatedData.newFile.size;
      }

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

  const handleDeleteRecord = async (id, fileName, category) => {
    if (!confirm("Delete this record permanently?")) return;

    await deleteDoc(doc(db, "documents", id));
    await deleteObject(ref(storage, `${category}/${fileName}`));
  };

  const processedDocuments = useMemo(() => {
    let result = [...documents];

    result = result.filter((doc) => {
      if (doc.category === "ordinances" && !filters.ordinances) return false;
      if (doc.category === "resolutions" && !filters.resolutions) return false;
      return true;
    });

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((doc) =>
        [doc.number, doc.title, doc.sponsor, doc.committee, doc.fileName].join(" ").toLowerCase().includes(q)
      );
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case "number":
          return (a.number || "").localeCompare(b.number || "");
        case "sponsor":
          return (a.sponsor || "").localeCompare(b.sponsor || "");
        case "date":
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });

    return result;
  }, [documents, searchQuery, sortBy, filters]);

  useEffect(() => {
    const q = query(collection(db, "documents"), where("category", "==", activeMenu), orderBy("uploadedAt", "desc"));

    const unsub = onSnapshot(
      q,
      (snap) => {
        setDocuments(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
        setLoadingDocs(false);
      },
      () => setLoadingDocs(false)
    );

    return () => unsub();
  }, [activeMenu]);

  /* ---------------------- RENDER ---------------------- */

  return (
    <div className="h-screen bg-gray-100 overflow-hidden">
      {/* Desktop Sidebar */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        onAddRecord={() => setShowAddRecordDialog(true)}
        userData={currentUser}
        userRole={userRole}
        className="hidden lg:flex"
      />

      {/* Top Navbar */}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
        setFilters={setFilters}
        filters={filters}
      />

      {/* Main Content */}
      <MainContent
        documents={processedDocuments}
        loading={loadingDocs}
        activeMenu={activeMenu}
        onEdit={(r) => {
          setSelectedRecord(r);
          setShowEditRecordDialog(true);
        }}
        onDelete={handleDeleteRecord}
      />

      {/* Mobile UI */}
      <MobileBottomNav
        active={activeBottomTab}
        setActive={setActiveBottomTab}
        activeMenu={activeMenu}
        onAdd={() => setShowAddRecordDialog(true)}
        onMenu={() => setMobileMenuOpen(true)}
      />

      <MobileSidebar
        open={mobileMenuOpen}
        setActiveMenu={setActiveMenu}
        onClose={() => setMobileMenuOpen(false)}
        userData={currentUser}
        userRole={userRole}
      />

      {/* Modals */}
      {showAddRecordDialog && (
        <AddRecordDialog
          isOpen
          onClose={() => setShowAddRecordDialog(false)}
          onSubmit={handleAddRecord}
          isLoading={isUploading}
        />
      )}

      {showEditRecordDialog && (
        <EditRecordModal
          isOpen
          record={selectedRecord}
          onClose={() => setShowEditRecordDialog(false)}
          onUpdate={handleUpdateRecord}
          isLoading={isUpdating}
        />
      )}
    </div>
  );
}
