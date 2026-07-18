import { useEffect, useState } from "react";
import StatCard from "../components/StatCard";
import { getReports } from "../services/reportsService";

function Dashboard() {
  const [reports, setReports] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    async function loadReports() {
      try {
        const savedReports = await getReports();
        setReports(savedReports);
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error.message);
      }
    }

    loadReports();
  }, []);

  const totalReports = reports.length;

  const pendingReports = reports.filter(
    (report) => report.status === "Pending"
  ).length;

  const resolvedReports = reports.filter(
    (report) => report.status === "Resolved"
  ).length;

  const impactScore = resolvedReports * 10 + totalReports * 2;

  return (
    <main className="min-h-screen bg-green-50 px-6 py-12">
      <section className="max-w-5xl mx-auto">
        <p className="text-green-700 font-semibold mb-2">Dashboard</p>

        <h1 className="text-4xl font-bold text-gray-900">
          Cleanliness impact dashboard
        </h1>

        <p className="mt-4 text-gray-600">
          Track report activity and basic cleanliness impact.
        </p>

        {errorMessage && (
          <div className="mt-6 bg-red-100 text-red-800 px-5 py-4 rounded-2xl font-medium">
            {errorMessage}
          </div>
        )}

        <div className="mt-8 grid md:grid-cols-4 gap-6">
          <StatCard
            title="Total Reports"
            value={totalReports}
            description="Cleanliness issues recorded"
          />

          <StatCard
            title="Pending"
            value={pendingReports}
            description="Reports waiting for action"
          />

          <StatCard
            title="Resolved"
            value={resolvedReports}
            description="Issues marked as resolved"
          />

          <StatCard
            title="Impact Score"
            value={impactScore}
            description="Based on total and resolved reports"
          />
        </div>
      </section>
    </main>
  );
}

export default Dashboard;
