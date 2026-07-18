import { useEffect, useState } from "react";
import { addTip, getTips } from "../services/tipsService";

const initialTipData = {
  author: "",
  title: "",
  category: "Clean Habit",
  description: "",
};

function SustainabilityTips() {
  const [tips, setTips] = useState([]);
  const [tipData, setTipData] = useState(initialTipData);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setTips(getTips());
  }, []);

  function handleChange(event) {
    const { name, value } = event.target;

    setTipData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!tipData.title.trim() || !tipData.description.trim()) {
      setMessage("Please fill tip title and description.");
      return;
    }

    addTip({
      author: tipData.author.trim(),
      title: tipData.title.trim(),
      category: tipData.category,
      description: tipData.description.trim(),
    });

    setTips(getTips());
    setTipData(initialTipData);
    setMessage("Your sustainability tip was shared successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  }

  return (
    <main className="min-h-screen bg-green-50 px-6 py-12">
      <section className="max-w-6xl mx-auto">
        <p className="text-green-700 font-semibold mb-2">
          Sustainability Tips
        </p>

        <h1 className="text-4xl font-bold text-gray-900">
          Simple habits for a cleaner India
        </h1>

        <p className="mt-4 text-gray-600 max-w-3xl">
          CleanIndia Connect is not only about reporting problems. It is also
          about building better daily habits that reduce waste and protect the
          environment.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 bg-white rounded-3xl shadow-sm border border-green-100 p-8 grid gap-6"
        >
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Share your sustainability tip
            </h2>
            <p className="mt-2 text-gray-600">
              Add a useful habit, idea, or awareness message for others.
            </p>
          </div>

          {message && (
            <div className="bg-green-100 text-green-800 px-5 py-4 rounded-2xl font-medium">
              {message}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="author"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Your Name
              </label>
              <input
                id="author"
                type="text"
                name="author"
                value={tipData.author}
                onChange={handleChange}
                maxLength="60"
                placeholder="Optional"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>

            <div>
              <label
                htmlFor="category"
                className="block text-sm font-semibold text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={tipData.category}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option>Clean Habit</option>
                <option>Plastic-Free Living</option>
                <option>Waste Reduction</option>
                <option>Waste Management</option>
                <option>Citizen Action</option>
                <option>Environment Safety</option>
              </select>
            </div>
          </div>

          <div>
            <label
              htmlFor="tipTitle"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Tip Title
            </label>
            <input
              id="tipTitle"
              type="text"
              name="title"
              value={tipData.title}
              onChange={handleChange}
              maxLength="100"
              placeholder="Example: Carry a cloth bag while shopping"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="tipDescription"
              className="block text-sm font-semibold text-gray-700 mb-2"
            >
              Tip Description
            </label>
            <textarea
              id="tipDescription"
              rows="4"
              name="description"
              value={tipData.description}
              onChange={handleChange}
              maxLength="400"
              placeholder="Explain your tip in simple words..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-600"
            ></textarea>
            <p className="text-xs text-gray-500 mt-2">
              {tipData.description.length}/400 characters
            </p>
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
          >
            Share Tip
          </button>
        </form>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tips.map((tip) => (
            <div
              key={tip.id}
              className="bg-white rounded-3xl shadow-sm border border-green-100 p-6 hover:shadow-md transition"
            >
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                {tip.category}
              </span>

              <h2 className="text-xl font-bold text-gray-900 mt-5">
                {tip.title}
              </h2>

              <p className="text-gray-600 mt-3 leading-relaxed">
                {tip.description}
              </p>

              <p className="text-sm text-gray-500 mt-5">
                Shared by {tip.author || "CleanIndia Connect"}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-green-700 text-white rounded-3xl p-8">
          <h2 className="text-2xl font-bold">
            Small actions create big impact
          </h2>

          <p className="mt-3 text-green-50 max-w-3xl">
            A cleaner India starts with simple actions: using dustbins,
            reducing plastic, reporting garbage, and motivating others to care
            for public spaces.
          </p>
        </div>
      </section>
    </main>
  );
}

export default SustainabilityTips;