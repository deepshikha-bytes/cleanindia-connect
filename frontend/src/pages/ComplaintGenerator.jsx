import { useState } from "react";
import { generateComplaintText } from "../services/complaintService";

const initialComplaintData = {
  citizenName: "",
  location: "",
  issueType: "Garbage Dump",
  urgency: "Medium",
  description: "",
};

function ComplaintGenerator() {
  const [complaintData, setComplaintData] = useState(initialComplaintData);
  const [generatedComplaint, setGeneratedComplaint] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const [copyStatus, setCopyStatus] = useState("");

  function handleChange(event) {
    const { name, value } = event.target;

    setComplaintData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleGenerate(event) {
    event.preventDefault();

    const location = complaintData.location.trim();
    const description = complaintData.description.trim();

    if (!location || !description) {
      alert("Please fill location and problem description.");
      return;
    }

    const complaint = generateComplaintText(complaintData);

    setGeneratedComplaint(complaint);
    setCopyMessage("");
    setCopyStatus("");
  }

  async function handleCopy() {
    if (!generatedComplaint) {
      return;
    }

    try {
      await navigator.clipboard.writeText(generatedComplaint);
      setCopyMessage("Complaint copied successfully!");
      setCopyStatus("success");
    } catch (error) {
      setCopyMessage(
        "Could not copy automatically. Please select the complaint text and copy manually."
      );
      setCopyStatus("error");
    }
  }

  function handleReset() {
    setComplaintData(initialComplaintData);
    setGeneratedComplaint("");
    setCopyMessage("");
    setCopyStatus("");
  }

  return (
    <main className="min-h-screen bg-green-50 px-6 py-12">
      <section className="max-w-6xl mx-auto">
        <p className="text-green-700 font-semibold mb-2">
          Complaint Generator
        </p>

        <h1 className="text-4xl font-bold text-gray-900">
          Generate a formal complaint
        </h1>

        <p className="mt-4 text-gray-600 max-w-3xl">
          Convert simple cleanliness issue details into a formal complaint format
          that can be copied and submitted to official platforms.
        </p>

        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <form
            onSubmit={handleGenerate}
            className="bg-white rounded-3xl shadow-sm border border-green-100 p-8 grid gap-6"
          >
            <div>
              <label
                htmlFor="citizenName"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                id="citizenName"
                type="text"
                name="citizenName"
                value={complaintData.citizenName}
                onChange={handleChange}
                maxLength="60"
                placeholder="Example: Deepshikha"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="location"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Location
              </label>
              <input
                id="location"
                type="text"
                name="location"
                value={complaintData.location}
                onChange={handleChange}
                maxLength="120"
                placeholder="Example: Near main road, Bikaner"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="issueType"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Issue Type
                </label>
                <select
                  id="issueType"
                  name="issueType"
                  value={complaintData.issueType}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option>Garbage Dump</option>
                  <option>Overflowing Dustbin</option>
                  <option>Plastic Waste</option>
                  <option>Open Drain</option>
                  <option>Waste Burning</option>
                  <option>Dirty Public Place</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="urgency"
                  className="block text-sm font-semibold text-gray-700 mb-2"
                >
                  Urgency Level
                </label>
                <select
                  id="urgency"
                  name="urgency"
                  value={complaintData.urgency}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Problem Description
              </label>
              <textarea
                id="description"
                rows="5"
                name="description"
                value={complaintData.description}
                onChange={handleChange}
                maxLength="600"
                placeholder="Explain the issue in simple words..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              ></textarea>
              <p className="text-xs text-gray-500 mt-2">
                {complaintData.description.length}/600 characters
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                type="submit"
                className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Generate Complaint
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="border border-gray-300 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Reset
              </button>
            </div>
          </form>

          <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Generated Complaint
            </h2>

            <p className="mt-3 text-gray-600">
              Your formal complaint will appear here after generation. You can
              copy it using the button or manually select the text.
            </p>

            <textarea
              readOnly
              value={generatedComplaint || "No complaint generated yet."}
              className="mt-6 w-full min-h-80 bg-gray-50 border border-gray-200 rounded-2xl p-5 whitespace-pre-wrap text-gray-700 leading-relaxed focus:outline-none focus:ring-2 focus:ring-green-600"
            />

            {copyMessage && (
              <p
                className={`mt-4 font-medium ${
                  copyStatus === "error" ? "text-red-700" : "text-green-700"
                }`}
              >
                {copyMessage}
              </p>
            )}

            <button
              type="button"
              onClick={handleCopy}
              disabled={!generatedComplaint}
              className="mt-5 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              Copy Complaint
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default ComplaintGenerator;