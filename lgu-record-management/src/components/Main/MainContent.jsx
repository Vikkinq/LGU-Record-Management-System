import MainTable from "./MainTable";

export default function MainContent({ searchQuery, sortBy, filters, activeMenu }) {
  return (
    <main className="flex-1 ml-64 mt-20 overflow-auto p-6">
      <div className="bg-white rounded-lg shadow">
        <MainTable searchQuery={searchQuery} sortBy={sortBy} filters={filters} activeMenu={activeMenu} />
      </div>
    </main>
  );
}
