"use client";

import { useEffect, useState } from "react";
import MainTable from "./MainTable";
import { FileText, ChevronLeft, ChevronRight } from "lucide-react";

export default function MainContent({ documents, loading, activeMenu, onEdit, onDelete }) {
  const labelPrefix = activeMenu === "resolutions" ? "Resolution" : "Ordinance";

  // 🔹 Pagination State
  const ITEMS_PER_PAGE = 30;
  const [currentPage, setCurrentPage] = useState(1);

  // 🔹 Reset page when menu changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeMenu]);

  const totalPages = Math.ceil(documents.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedDocs = documents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const headers = [
    `${labelPrefix} Number`,
    `${labelPrefix} Title`,
    "Approval Date",
    "Expiry Date",
    "Sponsor",
    "Committee",
    "File Path",
    "Actions",
  ];

  return (
    <main
      className="
        pt-20 px-4 pb-24 mt-8
        lg:ml-64 lg:px-6 lg:pb-6
        overflow-auto h-full
      "
    >
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* THEAD */}
            <thead>
              <tr className="bg-slate-50 border-b">
                {headers.map((h) => (
                  <th
                    key={h}
                    className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-slate-700"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            {/* TBODY */}
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={headers.length} className="py-16 text-center">
                    Loading records...
                  </td>
                </tr>
              ) : paginatedDocs.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} className="py-20 text-center">
                    <FileText className="w-10 h-10 mx-auto text-slate-400" />
                    <p className="mt-2 text-slate-600">No records found for {activeMenu}</p>
                  </td>
                </tr>
              ) : (
                <MainTable documents={paginatedDocs} onEdit={onEdit} onDelete={onDelete} />
              )}
            </tbody>
          </table>
        </div>

        {/* 🔹 Pagination Footer */}
        {!loading && documents.length > ITEMS_PER_PAGE && (
          <div className="flex items-center justify-between px-6 py-4 border-t bg-slate-50">
            <p className="text-sm text-slate-600">
              Showing <span className="font-medium">{startIndex + 1}</span> –{" "}
              <span className="font-medium">{Math.min(startIndex + ITEMS_PER_PAGE, documents.length)}</span> of{" "}
              <span className="font-medium">{documents.length}</span>
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                Prev
              </button>

              <span className="text-sm text-slate-600">
                Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
              </span>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
