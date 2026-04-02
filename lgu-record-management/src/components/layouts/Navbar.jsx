"use client";
import { useState } from "react";
import { Search, ChevronDown, Sliders, Menu, X } from "lucide-react";

export default function Navbar({ searchQuery, setSearchQuery, sortBy, setSortBy, setExpiryFilter, expiryFilter }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-slate-700 text-white px-4 md:px-6 py-3 z-40 flex items-center justify-between h-24">
      {/* Logo / Brand */}
      <div className="flex items-center gap-3 px-4 py-4">
        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full overflow-hidden bg-white">
          <img
            src="https://scontent.fcgy2-1.fna.fbcdn.net/v/t39.30808-6/577784236_25136480575963085_1706918526497340446_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=1d70fc&_nc_eui2=AeHjR1qg50c_bFffQlcVZ90le7w9G6MNLlF7vD0bow0uUTdXLeBpAh1Dw60C7Q5dbKQnviDk8D-l316SZOXKoS4t&_nc_ohc=9dorHjU0dzEQ7kNvwGClj6F&_nc_oc=Adr-spdR9M-GtIuc1NgxLJJ-LbIbA3USJhK6MBTSNq9O6w4Q2O6IWgK084GsMX4cYfc&_nc_zt=23&_nc_ht=scontent.fcgy2-1.fna&_nc_gid=IzefFVbaeX4m0nvnb7qukA&_nc_ss=7a3a8&oh=00_Af0FxG_ba8mt3-58wx_qX7nxBur9D1nrrGIGeYz56uMTvQ&oe=69D3D1D5"
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
        <select
          className="px-4 py-2 rounded bg-white text-gray-700 text-sm md:text-base font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={expiryFilter}
          onChange={(e) => setExpiryFilter(e.target.value)}
        >
          <option value="all">All Records</option>
          <option value="expired">Expired</option>
          <option value="active">Active</option>
        </select>
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

          <select
            value={expiryFilter}
            onChange={(e) => setExpiryFilter(e.target.value)}
            className="w-full px-4 py-2 rounded bg-white text-gray-700 text-sm font-medium border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Records</option>
            <option value="expired">Expired</option>
            <option value="active">Active</option>
          </select>
        </div>
      )}
    </nav>
  );
}
