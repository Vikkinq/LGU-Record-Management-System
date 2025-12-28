import { X, Upload, File } from "lucide-react";
import { useState } from "react";

export default function AddRecordModal({ isOpen, onClose, onSubmit }) {
  const [category, setCategory] = useState("ordinances");
  const [files, setFiles] = useState([]);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  const handleCategoryChange = (e) => setCategory(e.target.value);

  const handleFiles = (selectedFiles) => {
    setFiles((prev) => [...prev, ...Array.from(selectedFiles)]);
  };

  const handleFileInputChange = (e) => {
    handleFiles(e.target.files);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
      e.dataTransfer.clearData();
    }
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (files.length === 0) return;
    onSubmit({ category, files });
    setFiles([]);
    setCategory("ordinances");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-100 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <h2 className="text-xl font-bold text-slate-900">Add New Record</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Category */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Category</label>
            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 text-slate-700 font-medium bg-white"
            >
              <option value="ordinances">Ordinances</option>
              <option value="resolutions">Resolutions</option>
            </select>
          </div>

          {/* File Upload */}
          <div>
            <label className="block text-sm font-semibold text-slate-900 mb-2">Upload Files</label>
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all ${
                dragActive ? "border-cyan-500 bg-cyan-50" : "border-slate-300 bg-slate-50 hover:border-slate-400"
              }`}
            >
              <input
                type="file"
                multiple
                onChange={handleFileInputChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center gap-2">
                <Upload className="w-8 h-8 text-cyan-500" />
                <div>
                  <p className="text-sm font-medium text-slate-900">Drag & drop files here</p>
                  <p className="text-xs text-slate-500 mt-1">or click to select files</p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Files */}
          {files.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm font-medium text-slate-700">Selected Files ({files.length})</p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {files.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <File className="w-4 h-4 text-slate-500 shrink-0" />
                      <span className="text-sm text-slate-700 truncate">{file.name}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(index)}
                      className="ml-2 p-1 text-red-500 hover:bg-red-50 rounded transition-colors shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={files.length === 0}
              className="flex-1 px-4 py-2.5 bg-linear-to-r from-cyan-500 to-blue-600 text-white rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Record
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
