import { X, LogOut, Settings } from "lucide-react";
import { logoutUser } from "../../services/auth.services";

export default function MobileSidebar({ open, onClose, userData, userRole, setActiveMenu, activeMenu }) {
  if (!open) return null;

  const menuItems = [
    { id: "ordinances", label: "Ordinances", icon: "📋" },
    { id: "resolutions", label: "Resolutions", icon: "📄" },
  ];

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} className="fixed inset-0 bg-black/40 z-40 lg:hidden" />

      {/* Drawer */}
      <aside className="fixed top-0 right-0 h-screen w-72 bg-slate-700 text-white z-50 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {/* User Info */}
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

        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-600 mb-6">
          <img className="w-10 h-10 rounded-full" src="https://img.icons8.com/nolan/1200/user-default.jpg" alt="user" />
          <div>
            <p className="text-sm font-semibold">{userData?.email}</p>
            <p className="text-xs capitalize">{userRole}</p>
          </div>
        </div>

        <div className="mt-auto space-y-3">
          <button className="w-full flex items-center gap-3 px-4 py-2 rounded bg-slate-600 hover:bg-slate-500">
            <Settings className="w-4 h-4" />
            Settings
          </button>

          <button
            onClick={logoutUser}
            className="w-full flex items-center gap-3 px-4 py-2 rounded bg-red-500 hover:bg-red-600"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}
