import MainTable from "./MainTable";
import { FileText } from "lucide-react";

export default function MainContent({ documents, loading, activeMenu, onEdit, onDelete }) {
  const labelPrefix = activeMenu === "resolutions" ? "Resolution" : "Ordinance";

  const headers = [
    `${labelPrefix} Number`,
    `${labelPrefix} Title`,
    `${labelPrefix} Date`,
    "Expiry Date",
    "Sponsor",
    "Committee",
    "File Path",
    "Actions",
  ];

  return (
    <main className="flex-1 ml-64 mt-20 overflow-auto p-6">
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
              ) : documents.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} className="py-20 text-center">
                    <FileText className="w-10 h-10 mx-auto text-slate-400" />
                    <p>No records found for {activeMenu}</p>
                  </td>
                </tr>
              ) : (
                <MainTable documents={documents} onEdit={onEdit} onDelete={onDelete} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
