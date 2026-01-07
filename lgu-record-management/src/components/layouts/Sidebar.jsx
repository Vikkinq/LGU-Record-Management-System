"use client";

import React, { useEffect, useState } from "react";
import { LogOut, Settings, Plus, FileText, File, User } from "lucide-react";
import { logoutUser } from "../../services/auth.services";
import { db } from "../../firebase/firebase"; // your firebase config
import { collection, query, where, getDocs } from "firebase/firestore";

export default function Sidebar({ activeMenu, setActiveMenu, onAddRecord, userData, userRole }) {
  const menuItems = [
    { id: "ordinances", label: "Ordinances", icon: <FileText className="w-5 h-5" /> },
    { id: "resolutions", label: "Resolutions", icon: <File className="w-5 h-5" /> },
  ];

  const [docCounts, setDocCounts] = useState({ ordinances: 0, resolutions: 0 });

  useEffect(() => {
    async function fetchCounts() {
      try {
        const colRef = collection(db, "documents");
        const ordinancesSnap = await getDocs(query(colRef, where("category", "==", "ordinances")));
        const resolutionsSnap = await getDocs(query(colRef, where("category", "==", "resolutions")));

        setDocCounts({
          ordinances: ordinancesSnap.size,
          resolutions: resolutionsSnap.size,
        });
      } catch (err) {
        console.error("Error fetching document counts:", err);
      }
    }
    fetchCounts();
  }, []);

  const handleLogout = () => logoutUser();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-800 text-white pt-20 z-30 flex flex-col shadow-lg">
      {/* Add Record Button */}
      <div className="px-4 py-6">
        <button
          onClick={onAddRecord}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md"
        >
          <Plus className="w-5 h-5" />
          Add Record
        </button>
      </div>

      {/* Menu Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center justify-between ${
              activeMenu === item.id
                ? "bg-slate-700 border-l-4 border-emerald-500 text-white shadow-inner"
                : "text-slate-200 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="font-medium">{item.label}</span>
            </div>
            <span className="text-xs bg-slate-700 px-2 py-0.5 rounded-full text-emerald-400 font-semibold">
              {docCounts[item.id]}
            </span>
          </button>
        ))}
      </nav>

      {/* User Profile & Actions */}
      <div className="border-t border-slate-600 px-4 py-4 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors shadow-sm">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-600">
            <img
              src={
                userRole === "admin"
                  ? "https://www.pngmart.com/files/21/Admin-Profile-Vector-PNG-Isolated-HD.png"
                  : "https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
              }
              alt={userRole}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{userData.email}</p>
            <p className="text-xs text-slate-300 capitalize">{userRole}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors text-sm font-medium shadow-sm"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          {userRole === "admin" && (
            <button className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-600 transition-colors shadow-sm">
              <User className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
}
