import { useEffect, useState } from "react";
import { FileText, Trash2, Pencil } from "lucide-react"; 
import { collection, query, orderBy, onSnapshot, where, deleteDoc, doc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "../../firebase/firebase"; 

export default function MainTable({ searchQuery, sortBy, filters, activeMenu, onEdit }) {
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. DYNAMIC LABEL LOGIC
  // If activeMenu is 'resolutions', use "Resolution", otherwise "Ordinance"
  const labelPrefix = activeMenu === "resolutions" ? "Resolution" : "Ordinance";

  // FETCH DATA
  useEffect(() => {
    const docsRef = collection(db, "documents");

    const q = query(
      docsRef, 
      where("category", "==", activeMenu), 
      orderBy("uploadedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedDocs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(fetchedDocs);
      setLoading(false);
    }, (error) => {
      console.error("Error fetching documents:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [activeMenu]);

  const handleDelete = async (docId, fileName, category) => {
    if (!window.confirm("Are you sure you want to delete this record? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteDoc(doc(db, "documents", docId));
      const fileRef = ref(storage, `${category}/${fileName}`);
      await deleteObject(fileRef);
      alert("Record deleted successfully.");
    } catch (error) {
      console.error("Error deleting record:", error);
      alert("Failed to delete record. See console for details.");
    }
  };

  // 2. USE DYNAMIC LABELS IN HEADERS
  const tableHeaders = [
    `${labelPrefix} Number`,  // e.g. "Ordinance Number" or "Resolution Number"
    `${labelPrefix} Date`,
    "Expiry Date",
    "Sponsor",
    "Committee",
    `${labelPrefix} Title`,
    "File Path",
    "Actions",
  ];

  if (loading) return <div className="p-10 text-center">Loading records...</div>;

  return (
    <div className="overflow-x-auto min-h-[400px]">
      <table className="w-full">
        <thead>
          <tr className="bg-emerald-600 text-white">
            {tableHeaders.map((header) => (
              <th key={header} className="px-6 py-3 text-left text-sm font-semibold whitespace-nowrap">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          
          {documents.length === 0 ? (
            <tr>
              <td colSpan={tableHeaders.length} className="px-6 py-10 text-center text-gray-500">
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <FileText className="w-6 h-6 text-gray-400" />
                  </div>
                  <p className="font-medium">No records found for {activeMenu}</p>
                  <p className="text-xs text-gray-400">Click "Add Record" to create a new entry.</p>
                </div>
              </td>
            </tr>
          ) : (
            documents.map((doc) => (
              <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 text-sm text-gray-900 font-medium">
                  {doc.number || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {doc.date ? new Date(doc.date).toLocaleDateString() : "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                  {doc.expiryDate ? (
                    <span className="text-red-600 font-medium">
                      {new Date(doc.expiryDate).toLocaleDateString()}
                    </span>
                  ) : (
                    <span className="text-gray-400 italic">None</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {doc.sponsor || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {doc.committee || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 max-w-xs truncate" title={doc.title}>
                  {doc.title || doc.fileName}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700 truncate max-w-[150px]" title={doc.fileName}>
                  {doc.fileName}
                </td>
                <td className="px-6 py-4 text-sm">
                  <div className="flex items-center gap-3">
                    <a 
                      href={doc.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700 transition-colors" 
                      title="View File"
                    >
                      <FileText className="w-4 h-4" />
                    </a>
                    
                    <button 
                      onClick={() => onEdit(doc)} 
                      className="text-amber-500 hover:text-amber-700 transition-colors"
                      title="Edit Record"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>

                    <button 
                      onClick={() => handleDelete(doc.id, doc.fileName, doc.category)}
                      className="text-red-500 hover:text-red-700 transition-colors" 
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}