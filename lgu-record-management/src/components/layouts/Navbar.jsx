"use client";
import { Search, ChevronDown } from "lucide-react";

export default function Navbar({ searchQuery, setSearchQuery, sortBy, setSortBy, setFilters, filters }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-700 text-white px-6 py-4 z-40 flex items-center justify-between h-20">
      {/* Logo/Brand Section */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-white"></div>
        <span className="font-semibold text-lg">Ordinances</span>
      </div>

      {/* Search and Filter Section */}
      <div className="flex items-center gap-4">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search:"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded bg-white text-gray-700 text-sm w-48 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="absolute right-3 top-2.5 w-4 h-4 text-gray-400" />
        </div>

        {/* Sort Dropdown */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded bg-white text-gray-700 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none pr-8"
          >
            <option value="date">Sort by: Date</option>
            <option value="number">Sort by: Number</option>
            <option value="sponsor">Sort by: Sponsor</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-700 pointer-events-none" />
        </div>

        {/* Filters Button */}
        <button className="px-4 py-2 rounded bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors">
          Filters
        </button>
      </div>
    </nav>
  );
}
