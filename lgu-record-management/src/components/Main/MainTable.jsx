// MainTable.jsx
import { Pencil, Eye, Trash2 } from "lucide-react";

export default function MainTable({ documents, onEdit, onDelete }) {
  const today = new Date();

  return (
    <>
      {documents.map((doc, idx) => {
        const isExpired = doc.expiryDate && new Date(doc.expiryDate) < today;

        return (
          <tr
            key={doc.id}
            className={`border-b border-slate-200 last:border-b-0 hover:bg-slate-50 transition-colors ${
              idx % 2 === 0 ? "bg-white" : "bg-slate-50"
            }`}
          >
            {/* Number */}
            <td className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base font-semibold text-slate-900">
              {doc.number || "—"}
            </td>

            {/* Title */}
            <td
              className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-slate-700 max-w-30 md:max-w-xs truncate"
              title={doc.title || doc.fileName}
            >
              {doc.title || doc.fileName}
            </td>

            {/* Date */}
            <td className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-slate-700 whitespace-nowrap">
              {doc.date
                ? new Date(doc.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </td>

            {/* Expiry Date */}
            <td className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base whitespace-nowrap">
              {doc.expiryDate ? (
                <span
                  className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs md:text-sm font-semibold border ${
                    isExpired
                      ? "bg-red-100 text-red-800 border-red-200"
                      : "bg-green-100 text-green-800 border-green-200"
                  }`}
                >
                  {new Date(doc.expiryDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              ) : (
                <span className="text-slate-400">—</span>
              )}
            </td>

            {/* Sponsor */}
            <td className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-slate-700">{doc.sponsor || "—"}</td>

            {/* Committee */}
            <td className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-slate-700">{doc.committee || "—"}</td>

            {/* File Name */}
            <td
              className="px-3 md:px-4 py-2 md:py-3 text-sm md:text-base text-slate-700 truncate max-w-30 md:max-w-37.5"
              title={doc.fileName}
            >
              {doc.fileName}
            </td>

            {/* Actions */}
            <td className="px-3 md:px-4 py-2 md:py-3">
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <button
                  onClick={() => onEdit(doc)}
                  title="Edit"
                  className="p-2 md:p-2.5 rounded hover:bg-slate-100 transition"
                >
                  <Pencil className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                </button>

                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 md:p-2.5 rounded hover:bg-blue-50 transition"
                  title="View"
                >
                  <Eye className="w-4 h-4 md:w-5 md:h-5 text-blue-600" />
                </a>

                <button
                  onClick={() => onDelete(doc.id, doc.fileName, doc.category)}
                  title="Delete"
                  className="p-2 md:p-2.5 rounded hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4 md:w-5 md:h-5 text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
