import { Link } from "react-router-dom";

const features = [
  {
    title: "Report Issues",
    description:
      "Citizens can submit garbage and cleanliness problems with location, urgency, and image proof.",
  },
  {
    title: "Generate Complaints",
    description:
      "Convert simple issue details into a formal complaint format that can be copied and submitted manually.",
  },
  {
    title: "Track Impact",
    description:
      "View total reports, pending issues, resolved cases, and a simple cleanliness impact score.",
  },
];

const steps = [
  "Notice a garbage or cleanliness issue",
  "Submit a report with details and proof",
  "Generate a formal complaint",
  "Track status and spread awareness",
];

function LandingPage() {
  return (
    <main className="bg-gradient-to-br from-green-50 via-white to-emerald-100">
      <section className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-green-700 font-semibold mb-3">
            A civic-tech sustainability platform
          </p>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
            Report garbage.
            <br />
            Raise awareness.
            <br />
            Build a cleaner India.
          </h1>

          <p className="mt-6 text-gray-600 text-lg leading-relaxed">
            CleanIndia Connect helps citizens report garbage issues, upload
            proof, generate formal complaint text, share sustainability tips, and
            track clean impact in their local areas.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/report"
              className="bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Report an Issue
            </Link>

            <Link
              to="/reports"
              className="border border-green-700 text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
            >
              View Reports
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl p-8 border border-green-100">
          <div className="bg-green-100 rounded-2xl p-6 mb-5">
            <h2 className="text-2xl font-bold text-green-800">
              Mission
            </h2>
            <p className="mt-3 text-gray-700 leading-relaxed">
              To support a cleaner and more sustainable India by making it easier
              for citizens to report problems, prepare complaints, and take
              responsible action.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-3xl font-bold text-green-700">Local</p>
              <p className="text-sm text-gray-600">Issue Reporting</p>
            </div>

            <div className="bg-gray-50 rounded-2xl p-5">
              <p className="text-3xl font-bold text-green-700">Clean</p>
              <p className="text-sm text-gray-600">Impact Focus</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-green-700 font-semibold mb-2">
              The Problem
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Many people see cleanliness issues, but do not know how to take
              proper action.
            </h2>
          </div>

          <p className="text-gray-600 leading-relaxed text-lg">
            Garbage dumps, overflowing dustbins, plastic waste, and dirty public
            places affect health, environment, and community life. CleanIndia
            Connect gives citizens a simple way to report problems, prepare
            complaint text, and spread awareness.
          </p>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-green-700 font-semibold mb-2">
            How It Works
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            From problem to action in four steps
          </h2>

          <div className="mt-8 grid md:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step}
                className="bg-white rounded-3xl shadow-sm border border-green-100 p-6"
              >
                <span className="bg-green-700 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                  {index + 1}
                </span>

                <p className="mt-5 text-gray-800 font-semibold leading-relaxed">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white px-6 py-16">
        <div className="max-w-6xl mx-auto">
          <p className="text-green-700 font-semibold mb-2">
            Platform Features
          </p>

          <h2 className="text-3xl font-bold text-gray-900">
            Built for reporting, awareness, and action
          </h2>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-3xl border border-green-100 p-8 bg-green-50"
              >
                <h3 className="text-xl font-bold text-gray-900">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="max-w-6xl mx-auto bg-green-700 text-white rounded-3xl p-10 text-center">
          <h2 className="text-3xl font-bold">
            A cleaner India starts with one responsible action.
          </h2>

          <p className="mt-4 text-green-50 max-w-3xl mx-auto">
            Report a problem, generate a complaint, share awareness, and inspire
            others to care for public spaces.
          </p>

          <div className="mt-8 flex justify-center flex-wrap gap-4">
            <Link
              to="/report"
              className="bg-white text-green-700 px-6 py-3 rounded-xl font-semibold hover:bg-green-50 transition"
            >
              Start Reporting
            </Link>

            <Link
              to="/tips"
              className="border border-white text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
            >
              Read Tips
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default LandingPage;