import { X, Upload, File, Calendar, User, Hash, Users, Type } from "lucide-react";
import { useState } from "react";
// 1. Import the constants for validation
import { ALLOWED_FILE_TYPES } from "../../constants/file.constants";

export default function AddRecordModal({ isOpen, onClose, onSubmit, isLoading }) {
  const [category, setCategory] = useState("ordinances");
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  // New Form States
  const [number, setNumber] = useState("");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [sponsor, setSponsor] = useState("");
  const [committee, setCommittee] = useState("");
  const [expiryDate, setExpiryDate] = useState("");

  if (!isOpen) return null;

  // Helpers
  const isOrdinance = category === "ordinances";
  const labelPrefix = isOrdinance ? "Ordinance" : "Resolution";

  // 2. Create Validation Function
  const validateFile = (file) => {
    const validTypes = Object.values(ALLOWED_FILE_TYPES);

    // Check if the file type matches our allowed list
    if (!validTypes.includes(file.type)) {
      alert(`File "${file.name}" is not supported.\nPlease upload PDF, DOC, or DOCX files only.`);
      return false;
    }
    return true;
  };

  // 3. Update File Handler to filter invalid files
  const handleFiles = (selectedFiles) => {
    const newFiles = Array.from(selectedFiles).filter(validateFile);

    if (newFiles.length > 0) {
      setFiles((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) return;

    // Send all data to the parent component
    onSubmit({
      category,
      files,
      number,
      title,
      date,
      sponsor,
      committee,
      expiryDate,
    });

    // Reset Form
    setFiles([]);
    setNumber("");
    setTitle("");
    setDate("");
    setSponsor("");
    setCommittee("");
    setExpiryDate("");
    setCategory("ordinances");
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 shrink-0">
          <h2 className="text-xl font-bold text-slate-800">Add New Record</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>

        {/* Scrollable Form Area */}
        <div className="overflow-y-auto p-6 space-y-6">
          <form id="add-record-form" onSubmit={handleSubmit} className="space-y-6">
            {/* 1. Category Selection */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              >
                <option value="ordinances">Ordinances</option>
                <option value="resolutions">Resolutions</option>
              </select>
            </div>

            {/* 2. Basic Info (Number & Title) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-1">
                <label className="block text-sm font-semibold text-slate-700 mb-2">{labelPrefix} Number</label>
                <div className="relative">
                  <Hash className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="e.g. 2024-001"
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-slate-700 mb-2">{labelPrefix} Title</label>
                <div className="relative">
                  <Type className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder={`Enter ${labelPrefix} Title`}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 3. Dates */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Date Approved</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Expiry Date (Optional)</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-red-300" />
                  <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 4. People (Sponsor & Committee) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Sponsor</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Hon. Juan Dela Cruz"
                    value={sponsor}
                    onChange={(e) => setSponsor(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Committee</label>
                <div className="relative">
                  <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    required
                    type="text"
                    placeholder="e.g. Committee on Rules"
                    value={committee}
                    onChange={(e) => setCommittee(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* 5. File Upload Area */}
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Upload Document (PDF/Word)</label>
              <div
                onDragEnter={(e) => {
                  e.preventDefault();
                  setDragActive(true);
                }}
                onDragLeave={(e) => {
                  e.preventDefault();
                  setDragActive(false);
                }}
                onDragOver={(e) => {
                  e.preventDefault();
                }}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                  dragActive
                    ? "border-emerald-500 bg-emerald-50"
                    : "border-slate-300 bg-slate-50 hover:border-slate-400"
                }`}
              >
                {/* 4. Update Input to restrict file types in the browser dialog */}
                <input
                  type="file"
                  multiple
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleFiles(e.target.files)}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <div className="flex flex-col items-center gap-2">
                  <Upload className="w-10 h-10 text-emerald-500" />
                  <div>
                    <p className="text-sm font-medium text-slate-900">Drag & drop files here</p>
                    {/* 5. Update Helper Text */}
                    <p className="text-xs text-slate-500 mt-1">Allowed: PDF, DOC, DOCX</p>
                  </div>
                </div>
              </div>
            </div>

            {/* File List */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-100 rounded-lg text-sm">
                    <div className="flex items-center gap-2 overflow-hidden">
                      <File className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="truncate">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFiles(files.filter((_, i) => i !== index))}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 flex gap-3 shrink-0 bg-gray-50 rounded-b-xl">
          <button
            onClick={onClose}
            type="button"
            className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-white transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="add-record-form"
            disabled={files.length === 0 || isLoading}
            className="flex-1 px-4 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              "Add Record"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
