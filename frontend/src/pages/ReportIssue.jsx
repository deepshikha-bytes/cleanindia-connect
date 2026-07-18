import { useRef, useState } from "react";
import { addReport } from "../services/reportsService";

const initialFormData = {
  title: "",
  description: "",
  location: "",
  type: "Garbage Dump",
  urgency: "Low",
  image: "",
};

const MAX_IMAGE_SIZE = 2 * 1024 * 1024;

function ReportIssue() {
  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef(null);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleImageChange(event) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      setErrorMessage("Please upload an image smaller than 2 MB.");
      setImagePreview("");
      setFormData((prevData) => ({
        ...prevData,
        image: "",
      }));

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      return;
    }

    const reader = new FileReader();

    reader.onloadend = () => {
      const imageDataUrl = reader.result;

      setImagePreview(imageDataUrl);

      setFormData((prevData) => ({
        ...prevData,
        image: imageDataUrl,
      }));

      setErrorMessage("");
    };

    reader.readAsDataURL(file);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!formData.title || !formData.description || !formData.location) {
      setErrorMessage("Please fill title, description, and location.");
      return;
    }

    try {
      await addReport(formData);

      setSuccessMessage("Report submitted successfully!");
      setErrorMessage("");
      setFormData(initialFormData);
      setImagePreview("");

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      setTimeout(() => {
        setSuccessMessage("");
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <main className="min-h-screen bg-green-50 px-6 py-12">
      <section className="max-w-4xl mx-auto">
        <p className="text-green-700 font-semibold mb-2">Report Issue</p>

        <h1 className="text-4xl font-bold text-gray-900">
          Submit a garbage or cleanliness problem
        </h1>

        <p className="mt-4 text-gray-600">
          Share details about garbage dumps, plastic waste, overflowing dustbins,
          or other cleanliness issues in your area.
        </p>

        {successMessage && (
          <div className="mt-6 bg-green-100 text-green-800 px-5 py-4 rounded-2xl font-medium">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mt-6 bg-red-100 text-red-800 px-5 py-4 rounded-2xl font-medium">
            {errorMessage}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white rounded-3xl shadow-sm border border-green-100 p-8 grid gap-6"
        >
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Issue Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Example: Garbage dump near public road"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              rows="4"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the issue clearly..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City / Area
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Example: Bikaner, Rajasthan"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Issue Type
              </label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option>Garbage Dump</option>
                <option>Overflowing Dustbin</option>
                <option>Plastic Waste</option>
                <option>Open Drain</option>
                <option>Waste Burning</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Urgency Level
              </label>
              <select
                name="urgency"
                value={formData.urgency}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Image Proof
              </label>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white"
              />
              <p className="text-xs text-gray-500 mt-2">
                Maximum image size: 2 MB
              </p>
            </div>
          </div>

          {imagePreview && (
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">
                Image Preview
              </p>
              <img
                src={imagePreview}
                alt="Uploaded proof preview"
                className="w-full max-h-72 object-cover rounded-2xl border border-green-100"
              />
            </div>
          )}

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            Submit Report
          </button>
        </form>
      </section>
    </main>
  );
}

export default ReportIssue;
