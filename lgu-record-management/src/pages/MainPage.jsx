import { useAuth } from "../context/AuthContext";

import { useState, useEffect } from "react";

import Navbar from "../components/layouts/Navbar";
import Sidebar from "../components/layouts/Sidebar";
import MainContent from "../components/Main/MainContent";
import AddRecordDialog from "../components/Modal/AddRecordModal";

export default function MainPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [filters, setFilters] = useState({
    ordinances: true,
    resolutions: true,
  });
  const [activeMenu, setActiveMenu] = useState("ordinances");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showAddRecordDialog, setShowAddRecordDialog] = useState(false);

  const handleAddRecord = (recordData) => {
    console.log("New record:", recordData);
    setShowAddRecordDialog(false);
    // TODO: Send data to backend
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        sidebarOpen={sidebarOpen}
        onAddRecord={() => setShowAddRecordDialog(true)}
      />

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1">
        {/* Navbar */}
        <Navbar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setFilters={setFilters}
          filters={filters}
        />

        {/* Main Content Area */}
        <MainContent searchQuery={searchQuery} sortBy={sortBy} filters={filters} activeMenu={activeMenu} />

        {showAddRecordDialog && (
          <AddRecordDialog
            isOpen={showAddRecordDialog}
            onClose={() => setShowAddRecordDialog(false)}
            onSubmit={handleAddRecord}
          />
        )}
      </div>
    </div>
  );
}
