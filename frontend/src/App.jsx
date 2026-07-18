import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import LandingPage from "./pages/LandingPage";
import ReportIssue from "./pages/ReportIssue";
import ReportsFeed from "./pages/ReportsFeed";
import Dashboard from "./pages/Dashboard";
import ComplaintGenerator from "./pages/ComplaintGenerator";
import SustainabilityTips from "./pages/SustainabilityTips";
import GovernmentHelp from "./pages/GovernmentHelp";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <div className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/report" element={<ReportIssue />} />
            <Route path="/reports" element={<ReportsFeed />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/complaint" element={<ComplaintGenerator />} />
            <Route path="/tips" element={<SustainabilityTips />} />
            <Route path="/government-help" element={<GovernmentHelp />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;