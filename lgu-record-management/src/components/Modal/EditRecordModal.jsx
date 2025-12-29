import { X, Calendar, User, Hash, Users, Type, Save, Upload, FileText } from "lucide-react";
import { useState, useEffect } from "react";

export default function EditRecordModal({ isOpen, onClose, onUpdate, record, isLoading }) {
  const [formData, setFormData] = useState({
    category: "ordinances",
    number: "",
    title: "",
    date: "",
    sponsor: "",
    committee: "",
    expiryDate: ""
  });
  
  // NEW STATE: Store the new file if selected
  const [newFile, setNewFile] = useState(null);

  useEffect(() => {
    if (record) {
      setFormData({
        category: record.category || "ordinances",
        number: record.number || "",
        title: record.title || "",
        date: record.date || "",
        sponsor: record.sponsor || "",
        committee: record.committee || "",
        expiryDate: record.expiryDate || ""
      });
      setNewFile(null); // Reset file on open
    }
  }, [record]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setNewFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the new file (if any) along with the form data
    onUpdate(record.id, { ...formData, newFile });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Edit Record</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6">
          <form id="edit-record-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* EXISTING FILE INFO (Read Only) */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <p className="text-xs font-bold text-blue-600 uppercase mb-2">Current File</p>
              <div className="flex items-center gap-2 text-sm text-blue-800">
                <FileText className="w-4 h-4" />
                <span className="truncate max-w-[300px]">{record?.fileName}</span>
              </div>
            </div>

            {/* NEW: REPLACE FILE INPUT */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Replace Document (Optional)</label>
              <div className="flex items-center gap-3">
                <input 
                  type="file" 
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-emerald-50 file:text-emerald-700
                    hover:file:bg-emerald-100"
                />
              </div>
              {newFile && <p className="text-xs text-green-600 mt-2">New file selected: {newFile.name}</p>}
            </div>

            <hr className="border-gray-200" />

            {/* ... EXISTING TEXT INPUTS ... */}
            {/* (Keep Category, Number, Title, Date, Sponsor inputs exactly as they were) */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none">
                <option value="ordinances">Ordinances</option>
                <option value="resolutions">Resolutions</option>
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {/* Simplified for brevity - paste your existing inputs here (Number, Title, etc.) */}
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Number</label>
                 <input required type="text" name="number" value={formData.number} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none" />
               </div>
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Title</label>
                 <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none" />
               </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Date Approved</label>
                <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none" />
              </div>
              <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Sponsor</label>
                 <input required type="text" name="sponsor" value={formData.sponsor} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none" />
               </div>
            </div>
            
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Committee</label>
                 <input required type="text" name="committee" value={formData.committee} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none" />
               </div>
              <div>
                 <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date</label>
                 <input type="date" name="expiryDate" value={formData.expiryDate} onChange={handleChange} className="w-full px-4 py-2.5 border border-slate-300 rounded-lg outline-none" />
               </div>
            </div>

          </form>
        </div>

        <div className="px-6 py-4 border-t border-slate-200 flex gap-3 shrink-0 bg-gray-50 rounded-b-xl">
          <button onClick={onClose} type="button" className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-white transition-colors">Cancel</button>
          <button type="submit" form="edit-record-form" disabled={isLoading} className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors flex justify-center items-center gap-2">
            {isLoading ? "Saving..." : <><Save className="w-4 h-4" /> Save Changes</>}
          </button>
        </div>
      </div>
    </div>
  );
}