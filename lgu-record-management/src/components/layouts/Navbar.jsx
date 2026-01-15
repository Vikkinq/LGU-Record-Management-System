"use client";
import { useState } from "react";
import { Search, ChevronDown, Sliders, Menu, X } from "lucide-react";

export default function Navbar({ searchQuery, setSearchQuery, sortBy, setSortBy, setFilters, filters }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-700 text-white px-4 md:px-6 py-3 z-40 flex items-center justify-between h-24">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white">
          <img
            src="https://scontent.fcgy2-1.fna.fbcdn.net/v/t1.15752-9/514052846_1277406307075945_3903648811279742043_n.png?_nc_cat=102&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeFEvsqz829AN22rL7ol6Br32rrkB-xM3IrauuQH7Ezcil2KyuKp6LAeGn6qsdEwcqpYEdjeKvD8VsxwyAhM9L44&_nc_ohc=VAHKWgna_r8Q7kNvwG5SckN&_nc_oc=Adkw7J0DIuIUVWfF6yowa1bdZdGEJ-pedWERvS7GKEat2EGP-IeEYxl3uUrY0AA1438&_nc_zt=23&_nc_ht=scontent.fcgy2-1.fna&oh=03_Q7cD4QFOMvZF6PI4ZSsUghMj8gUR2yONkMSEGqjWUT-I5Hgr2A&oe=6985C260"
            alt="Panay LGU Logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="font-semibold text-lg md:text-xl text-white">Panay LGU</span>
      </div>

      {/* Desktop: Search + Sort + Filters */}
      <div className="hidden md:flex items-center gap-6">
        {/* Search */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded bg-white text-gray-700 text-sm md:text-base w-48 md:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
        </div>

        {/* Sort */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 rounded bg-white text-gray-700 text-sm md:text-base cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none pr-8"
          >
            <option value="date">Sort by: Date</option>
            <option value="number">Sort by: Number</option>
            <option value="sponsor">Sort by: Sponsor</option>
          </select>
          <ChevronDown className="absolute right-2 top-2.5 w-4 h-4 text-gray-700 pointer-events-none" />
        </div>

        {/* Filters */}
        <button
          className="flex items-center gap-2 px-4 py-2 rounded bg-white text-gray-700 text-sm md:text-base font-medium hover:bg-gray-100 transition-colors"
          onClick={() => setFilters(!filters)}
        >
          <Sliders className="w-4 h-4" />
          Filters
        </button>
      </div>

      {/* Mobile: Menu Toggle */}
      <div className="md:hidden">
        <button onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="absolute top-24 left-0 right-0 bg-slate-700 flex flex-col gap-3 p-4 md:hidden shadow-lg">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded bg-white text-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <Search className="absolute right-3 top-2.5 w-5 h-5 text-gray-400" />
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white text-gray-700 text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500 appearance-none pr-8"
          >
            <option value="date">Sort by: Date</option>
            <option value="number">Sort by: Number</option>
            <option value="sponsor">Sort by: Sponsor</option>
          </select>

          <button
            className="flex items-center gap-2 px-4 py-2 rounded bg-white text-gray-700 text-sm font-medium hover:bg-gray-100 transition-colors"
            onClick={() => setFilters(!filters)}
          >
            <Sliders className="w-4 h-4" />
            Filters
          </button>
        </div>
      )}
    </nav>
  );
}
