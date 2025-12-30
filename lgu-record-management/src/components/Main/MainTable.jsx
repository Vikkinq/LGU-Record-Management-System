import { Pencil, Eye, Trash2 } from "lucide-react";

export default function MainTable({ documents, onEdit, onDelete }) {
  const today = new Date();

  return (
    <>
      {documents.map((doc) => {
        const isExpired = doc.expiryDate && new Date(doc.expiryDate) < today;

        return (
          <tr key={doc.id} className="hover:bg-slate-50 transition-all border-b border-slate-100 last:border-b-0">
            {/* Number */}
            <td className="px-6 py-4 text-sm font-semibold text-slate-900">{doc.number || "—"}</td>

            {/* Title */}
            <td className="px-6 py-4 text-sm text-slate-700 max-w-xs truncate" title={doc.title || doc.fileName}>
              {doc.title || doc.fileName}
            </td>

            {/* Date */}
            <td className="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
              {doc.date
                ? new Date(doc.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "—"}
            </td>

            {/* Expiry Date */}
            <td className="px-6 py-4 text-sm whitespace-nowrap">
              {doc.expiryDate ? (
                <span
                  className={`inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-semibold border ${
                    isExpired
                      ? "bg-red-100 text-red-800 border-red-300"
                      : "bg-green-100 text-green-800 border-green-300"
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
            <td className="px-6 py-4 text-sm text-slate-700">{doc.sponsor || "—"}</td>

            {/* Committee */}
            <td className="px-6 py-4 text-sm text-slate-700">{doc.committee || "—"}</td>

            {/* File Name */}
            <td className="px-6 py-4 text-sm text-slate-700 truncate max-w-37.5" title={doc.fileName}>
              {doc.fileName}
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-2">
                <button onClick={() => onEdit(doc)} title="Edit" className="p-2 rounded hover:bg-slate-100 transition">
                  <Pencil className="w-4 h-4 text-slate-600" />
                </button>

                <a
                  href={doc.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded hover:bg-blue-50 transition"
                  title="View"
                >
                  <Eye className="w-4 h-4 text-blue-600" />
                </a>

                <button
                  onClick={() => onDelete(doc.id, doc.fileName, doc.category)}
                  title="Delete"
                  className="p-2 rounded hover:bg-red-50 transition"
                >
                  <Trash2 className="w-4 h-4 text-red-600" />
                </button>
              </div>
            </td>
          </tr>
        );
      })}
    </>
  );
}
