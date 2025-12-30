"use client";

import { LogOut, Settings, Plus } from "lucide-react";
import { logoutUser } from "../../services/auth.services";

export default function Sidebar({ activeMenu, setActiveMenu, sidebarOpen, onAddRecord, userData, userRole }) {
  const menuItems = [
    { id: "ordinances", label: "Ordinances", icon: "📋" },
    { id: "resolutions", label: "Resolutions", icon: "📄" },
  ];

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-600 text-white pt-20 z-30 flex flex-col">
      <div className="px-4 py-6">
        <button
          onClick={onAddRecord}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-semibold hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
        >
          <Plus className="w-5 h-5" />
          Add Record
        </button>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 text-sm font-medium ${
              activeMenu === item.id
                ? "bg-slate-700 border-l-4 border-emerald-500 text-white"
                : "text-slate-100 hover:bg-slate-700 hover:text-white"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="border-t border-slate-500 px-4 py-4 space-y-4">
        {/* User Profile Card */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700 hover:bg-slate-500 transition-colors">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 bg-slate-600">
            {userRole === "admin" ? (
              <img
                src="https://img.icons8.com/nolan/1200/user-default.jpg"
                alt="Admin"
                className="w-full h-full object-cover"
              />
            ) : (
              <img
                src="https://static.vecteezy.com/system/resources/previews/036/280/651/original/default-avatar-profile-icon-social-media-user-image-gray-avatar-icon-blank-profile-silhouette-illustration-vector.jpg"
                alt="Staff"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold truncate">{userData.email}</p>
            <p className="text-xs text-slate-300 capitalize">{userRole}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleLogout}
            className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors text-sm font-medium"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <button className="flex items-center justify-center px-3 py-2.5 rounded-lg bg-slate-700 hover:bg-slate-500 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
