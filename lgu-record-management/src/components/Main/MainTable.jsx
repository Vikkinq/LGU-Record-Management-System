import { FileText, Trash2 } from "lucide-react";

export default function MainTable({ searchQuery, sortBy, filters, activeMenu }) {
  // Sample data structure - can be replaced with actual data
  const tableHeaders = [
    "Ordinance Number",
    "Ordinance Date",
    "Sponsor",
    "Committee",
    "Ordinance Title",
    "File Path",
    "Actions",
  ];

  // Dummy data rows
  const tableRows = Array(8)
    .fill(null)
    .map((_, index) => ({
      id: index,
      number: "Data",
      date: "Data",
      sponsor: "Data",
      committee: "Data",
      title: "Data",
      filePath: "Data",
    }));

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-emerald-600 text-white">
            {tableHeaders.map((header) => (
              <th key={header} className="px-6 py-3 text-left text-sm font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {tableRows.map((row, index) => (
            <tr key={index} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-4 text-sm text-gray-700">{row.number}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.date}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.sponsor}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.committee}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.title}</td>
              <td className="px-6 py-4 text-sm text-gray-700">{row.filePath}</td>
              <td className="px-6 py-4 text-sm">
                <div className="flex items-center gap-3">
                  <button className="text-blue-500 hover:text-blue-700 transition-colors" title="View">
                    <FileText className="w-4 h-4" />
                  </button>
                  <button className="text-red-500 hover:text-red-700 transition-colors" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
