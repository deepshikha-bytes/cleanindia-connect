import { useEffect, useState } from "react";
import ReportCard from "../components/ReportCard";
import {
  addCommentToReport,
  deleteReport,
  getCurrentOwnerId,
  getReports,
  updateReportStatus,
} from "../services/reportsService";

const statusFilters = ["All", "Pending", "In Progress", "Resolved"];

function ReportsFeed() {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [toast, setToast] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [deletingReportId, setDeletingReportId] = useState("");
  const currentOwnerId = getCurrentOwnerId();

  useEffect(() => {
    async function loadReports() {
      try {
        const savedReports = await getReports();
        setReports(savedReports);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    loadReports();
  }, []);

  async function handleStatusChange(reportId, newStatus) {
    try {
      const updatedReport = await updateReportStatus(reportId, newStatus);
      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === reportId ? updatedReport : report
        )
      );
      setErrorMessage("");
      showToast("Report status updated.");
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  }

  async function handleAddComment(reportId, commentData) {
    try {
      const updatedReport = await addCommentToReport(reportId, commentData);
      setReports((currentReports) =>
        currentReports.map((report) =>
          report.id === reportId ? updatedReport : report
        )
      );
      setErrorMessage("");
      showToast("Suggestion added.");
    } catch (error) {
      setErrorMessage(error.message);
      throw error;
    }
  }

  async function handleDeleteReport(reportId) {
    const shouldDelete = window.confirm(
      "Delete this report? This action cannot be undone."
    );

    if (!shouldDelete) {
      return;
    }

    try {
      setDeletingReportId(reportId);
      await deleteReport(reportId);
      setReports((currentReports) =>
        currentReports.filter((report) => report.id !== reportId)
      );
      setErrorMessage("");
      showToast("Report deleted.");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setDeletingReportId("");
    }
  }

  function showToast(message) {
    setToast(message);
    setTimeout(() => {
      setToast("");
    }, 3000);
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredReports = reports.filter((report) => {
    const matchesStatus =
      statusFilter === "All" || report.status === statusFilter;
    const searchableText = `${report.title} ${report.location} ${report.type}`
      .toLowerCase();

    return matchesStatus && searchableText.includes(normalizedSearch);
  });

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <section className="max-w-5xl mx-auto">
        <p className="text-green-700 font-semibold mb-2">Reports Feed</p>

        <h1 className="text-4xl font-bold text-gray-900">
          Public cleanliness reports
        </h1>

        <p className="mt-4 text-gray-600">
          View reported garbage and cleanliness issues from different areas.
          Citizens can also share suggestions under each report.
        </p>

        {toast && (
          <div className="fixed right-6 top-24 z-50 rounded-2xl bg-green-700 px-5 py-3 text-sm font-semibold text-white shadow-lg">
            {toast}
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 bg-red-100 text-red-800 px-5 py-4 rounded-2xl font-medium">
            {errorMessage}
          </div>
        )}

        <div className="mt-8 grid gap-4 rounded-3xl border border-green-100 bg-white p-5 shadow-sm md:grid-cols-[1fr_auto] md:items-end">
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Search reports
            </label>
            <input
              type="search"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by title, location, or issue type"
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600 md:w-48"
            >
              {statusFilters.map((status) => (
                <option key={status}>{status}</option>
              ))}
            </select>
          </div>
        </div>

        {isLoading ? (
          <div className="mt-8 bg-white rounded-3xl shadow-sm border border-green-100 p-8 text-center">
            <p className="text-gray-600">Loading reports...</p>
          </div>
        ) : reports.length === 0 ? (
          <div className="mt-8 bg-white rounded-3xl shadow-sm border border-green-100 p-8 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-lg font-bold text-green-700">
              0
            </div>
            <h2 className="text-2xl font-bold text-gray-900">
              No reports submitted yet
            </h2>
            <p className="mt-3 text-gray-600">
              Be the first citizen to report a cleanliness issue in your area.
            </p>
          </div>
        ) : filteredReports.length === 0 ? (
          <div className="mt-8 bg-white rounded-3xl shadow-sm border border-green-100 p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              No matching reports
            </h2>
            <p className="mt-3 text-gray-600">
              Try a different search term or status filter.
            </p>
          </div>
        ) : (
          <div className="mt-8 grid gap-6">
            {filteredReports.map((report) => (
              <ReportCard
                key={report.id}
                report={report}
                onStatusChange={handleStatusChange}
                onAddComment={handleAddComment}
                onDelete={handleDeleteReport}
                canDelete={report.ownerId === currentOwnerId}
                isDeleting={deletingReportId === report.id}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default ReportsFeed;
