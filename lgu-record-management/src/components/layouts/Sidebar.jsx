import { LogOut, Settings, Plus } from "lucide-react";

export default function Sidebar({ activeMenu, setActiveMenu, sidebarOpen, onAddRecord }) {
  const menuItems = [
    { id: "ordinances", label: "Ordinances", icon: "📋" },
    { id: "resolutions", label: "Resolutions", icon: "📄" },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-600 text-white pt-20 z-30 flex flex-col">
      {/* Menu Items */}
      <div className="px-4 py-4 border-b border-slate-700">
        <button
          onClick={onAddRecord}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg transform hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add Record
        </button>
      </div>
      <nav className="flex-1 px-4 py-6">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveMenu(item.id)}
            className={`w-full text-left px-4 py-3 rounded-lg mb-2 transition-colors flex items-center gap-3 ${
              activeMenu === item.id ? "bg-slate-700 border-l-4 border-emerald-500" : "hover:bg-slate-700"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom User Section */}
      <div className="border-t border-slate-500 px-4 py-4 space-y-3">
        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-700 cursor-pointer hover:bg-slate-500 transition-colors">
          <div className="w-8 h-8 rounded-full bg-emerald-500"></div>
          <div className="flex-1">
            <p className="text-sm font-semibold">User Name</p>
            <p className="text-xs text-gray-300">Admin</p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex gap-2">
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 transition-colors text-sm">
            <LogOut className="w-4 h-4" />
            Logout
          </button>
          <button className="flex items-center justify-center px-3 py-2 rounded-lg bg-slate-700 hover:bg-slate-500 transition-colors">
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
