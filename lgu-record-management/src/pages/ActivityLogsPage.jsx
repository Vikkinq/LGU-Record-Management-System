import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { fetchActivityLogs } from "../services/logs.services";
import LoadingSpinner from "../components/general/LoadingSpinner";

// ─── Config ───────────────────────────────────────────────────────────────────

const PAGE_SIZE_OPTIONS = [20, 50];

const ACTION_META = {
  // Green — creations
  USER_CREATED: { label: "User Created", color: "green" },
  RECORD_CREATED: { label: "Record Created", color: "green" },

  // Amber — updates / non-destructive
  USER_DISABLED: { label: "User Disabled", color: "amber" },
  USER_ENABLED: { label: "User Enabled", color: "green" },
  ROLE_CHANGED: { label: "Role Changed", color: "blue" },
  RECORD_UPDATED: { label: "Record Updated", color: "blue" },

  // Red — deletions
  USER_DELETED: { label: "User Deleted", color: "red" },
  RECORD_DELETED: { label: "Record Deleted", color: "red" },

  RECORD_VIEWED: { label: "Record Viewed", color: "amber" },
};

const COLOR_CLASSES = {
  green: "bg-green-50 text-green-700 border-green-200",
  amber: "bg-amber-50 text-amber-700 border-amber-200",
  blue: "bg-blue-50  text-blue-700  border-blue-200",
  red: "bg-red-50   text-red-600   border-red-200",
  slate: "bg-slate-100 text-slate-600 border-slate-200",
};

const DOT_CLASSES = {
  green: "bg-green-500",
  amber: "bg-amber-500",
  blue: "bg-blue-500",
  red: "bg-red-500",
  slate: "bg-slate-400",
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getActionMeta(action) {
  return ACTION_META[action] ?? { label: action, color: "slate" };
}

function formatTimestamp(ts) {
  if (!ts) return "—";
  const date = ts.seconds ? new Date(ts.seconds * 1000) : new Date(ts);
  return (
    date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }) +
    " · " +
    date.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
}

// ─── Action Badge ─────────────────────────────────────────────────────────────

function ActionBadge({ action }) {
  const { label, color } = getActionMeta(action);
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold border ${COLOR_CLASSES[color]}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${DOT_CLASSES[color]}`} />
      {label}
    </span>
  );
}

// ─── Filter Categories ────────────────────────────────────────────────────────

const FILTER_OPTIONS = [
  { value: "all", label: "All" },
  { value: "created", label: "Created" },
  { value: "updated", label: "Updated" },
  { value: "deleted", label: "Deleted" },
  { value: "user", label: "Users" },
];

function matchesFilter(action, filter) {
  if (filter === "all") return true;
  if (filter === "created") return action.includes("CREATED") || action.includes("ENABLED");
  if (filter === "updated") return action.includes("UPDATED") || action.includes("DISABLED") || action.includes("ROLE");
  if (filter === "deleted") return action.includes("DELETED");
  if (filter === "user") return action.startsWith("USER");
  return true;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ActivityLogsPage() {
  const navigate = useNavigate();

  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchActivityLogs();
        setLogs(data);
      } catch (err) {
        console.error("Error fetching activity logs:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    let result = [...logs];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.action?.toLowerCase().includes(q) ||
          l.performedBy?.toLowerCase().includes(q) ||
          l.targetEmail?.toLowerCase().includes(q) ||
          l.details?.toLowerCase().includes(q),
      );
    }

    if (filter !== "all") {
      result = result.filter((l) => matchesFilter(l.action, filter));
    }

    return result;
  }, [logs, search, filter]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);

  const paginated = useMemo(() => {
    const start = (safePage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, safePage, pageSize]);

  useEffect(() => {
    setPage(1);
  }, [search, filter, pageSize]);

  const paginationRange = () => {
    const delta = 1;
    const range = [];
    for (let i = Math.max(1, safePage - delta); i <= Math.min(totalPages, safePage + delta); i++) range.push(i);
    if (range[0] > 2) range.unshift("...");
    if (range[0] !== 1) range.unshift(1);
    if (range[range.length - 1] < totalPages - 1) range.push("...");
    if (range[range.length - 1] !== totalPages) range.push(totalPages);
    return range;
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors group"
          >
            <svg
              className="w-4 h-4 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back
          </button>

          <div className="h-5 w-px bg-slate-200" />

          <div className="flex-1">
            <h1 className="text-xl font-semibold text-slate-800 leading-tight">Activity Logs</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              {loading ? "Loading…" : `${filtered.length} event${filtered.length !== 1 ? "s" : ""} found`}
            </p>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-5">
          {/* Search */}
          <div className="relative flex-1">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by action, user, or target…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm rounded-xl border border-slate-200 bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter pills */}
          <div className="flex rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden text-sm font-medium">
            {FILTER_OPTIONS.map((f) => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`px-4 py-2.5 transition-colors ${filter === f.value ? "bg-slate-800 text-white" : "text-slate-500 hover:bg-slate-50"}`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Timestamp
                  </th>
                  <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Action
                  </th>
                  <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Target
                  </th>
                  <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Details
                  </th>
                  <th className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-widest text-slate-400">
                    Performed By
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {loading ? (
                  <tr>
                    <td colSpan={5} className="py-16">
                      <LoadingSpinner label="Loading Records...." />
                    </td>
                  </tr>
                ) : paginated.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-16 text-center">
                      <div className="flex flex-col items-center gap-2">
                        <svg className="w-8 h-8 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                          />
                        </svg>
                        <p className="text-slate-400 font-medium">No activity logs found</p>
                        <p className="text-slate-300 text-xs">Try adjusting your search or filter</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  paginated.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Timestamp */}
                      <td className="px-6 py-4 text-xs text-slate-400 whitespace-nowrap">
                        {formatTimestamp(log.timestamp)}
                      </td>

                      {/* Action Badge */}
                      <td className="px-6 py-4 whitespace-nowrap">
                        <ActionBadge action={log.action} />
                      </td>

                      {/* Target */}
                      <td className="px-6 py-4 text-sm text-slate-600 max-w-[180px] truncate">
                        {log.targetEmail ?? log.targetName ?? "—"}
                      </td>

                      {/* Details */}
                      <td className="px-6 py-4 text-xs text-slate-400 max-w-[200px] truncate">{log.details ?? "—"}</td>

                      {/* Performed By */}
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 text-xs text-slate-600">
                          <span className="w-5 h-5 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-500 uppercase shrink-0">
                            {log.performedBy?.[0] ?? "?"}
                          </span>
                          <span className="truncate max-w-[140px]">{log.performedBy ?? "—"}</span>
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && filtered.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 border-t border-slate-100 bg-slate-50/50">
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>
                  Showing {(safePage - 1) * pageSize + 1}–{Math.min(safePage * pageSize, filtered.length)} of{" "}
                  {filtered.length}
                </span>
                <span className="text-slate-200">|</span>
                <span className="flex items-center gap-1.5">
                  Rows per page:
                  <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="border border-slate-200 rounded-md px-2 py-1 bg-white text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {PAGE_SIZE_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={safePage === 1}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                {paginationRange().map((item, i) =>
                  item === "..." ? (
                    <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-slate-300 text-xs">
                      …
                    </span>
                  ) : (
                    <button
                      key={item}
                      onClick={() => setPage(item)}
                      className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-medium transition ${
                        safePage === item
                          ? "bg-slate-800 text-white shadow-sm"
                          : "text-slate-500 hover:bg-white hover:border border-slate-200"
                      }`}
                    >
                      {item}
                    </button>
                  ),
                )}

                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safePage === totalPages}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-white hover:border border-slate-200 disabled:opacity-30 disabled:cursor-not-allowed transition"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
