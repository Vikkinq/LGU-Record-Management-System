import { Home, Search, Plus, User, Menu } from "lucide-react";

export default function MobileBottomNav({ onAdd, onMenu, active, setActive }) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white  shadow-md lg:hidden">
      <div className="relative flex items-center justify-between px-6 h-16">
        {/* Home */}
        <button
          onClick={() => setActive("home")}
          className={`flex flex-col items-center text-xs ${active === "home" ? "text-indigo-600" : "text-gray-500"}`}
        >
          <Home className="w-5 h-5" />
          Home
        </button>

        {/* Search */}
        <button
          onClick={() => setActive("search")}
          className={`flex flex-col items-center text-xs ${active === "search" ? "text-indigo-600" : "text-gray-500"}`}
        >
          <Search className="w-5 h-5" />
          Search
        </button>

        {/* Floating Add Button */}
        <button
          onClick={onAdd}
          className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg"
        >
          <Plus className="w-6 h-6" />
        </button>

        {/* User */}
        <button
          onClick={() => setActive("user")}
          className={`flex flex-col items-center text-xs ${active === "user" ? "text-indigo-600" : "text-gray-500"}`}
        >
          <User className="w-5 h-5" />
          User
        </button>

        {/* Menu */}
        <button onClick={onMenu} className="flex flex-col items-center text-xs text-gray-500">
          <Menu className="w-5 h-5" />
          Menu
        </button>
      </div>
    </nav>
  );
}
