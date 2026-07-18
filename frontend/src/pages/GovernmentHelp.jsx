function GovernmentHelp() {
  const platforms = [
    {
      id: 1,
      name: "Swachhata-MoHUA App",
      purpose: "Best for civic cleanliness issues like garbage dumps, overflowing dustbins, and sanitation-related complaints.",
      action: "Use the app to upload issue photo, select category, add location, and submit the complaint.",
      link: "https://play.google.com/store/apps/details?id=com.ichangemycity.swachhbharat",
    },
    {
      id: 2,
      name: "CPGRAMS Portal",
      purpose: "Useful for lodging public grievances related to government services and authorities.",
      action: "Copy your generated complaint text and submit it through the public grievance portal.",
      link: "https://pgportal.gov.in/",
    },
  ];

  const steps = [
    "Open the Complaint Generator page in CleanIndia Connect.",
    "Enter location, issue type, urgency, and problem description.",
    "Generate the formal complaint text.",
    "Copy the complaint text.",
    "Open the relevant official platform.",
    "Attach photo proof if the platform allows it.",
    "Submit the complaint and save the reference number.",
  ];

  return (
    <main className="min-h-screen bg-green-50 px-6 py-12">
      <section className="max-w-6xl mx-auto">
        <p className="text-green-700 font-semibold mb-2">Government Help</p>

        <h1 className="text-4xl font-bold text-gray-900">
          Submit complaints to official platforms
        </h1>

        <p className="mt-4 text-gray-600 max-w-3xl">
          CleanIndia Connect does not automatically submit complaints to
          government systems in Version 1. Instead, it helps citizens prepare
          clear complaint text that can be copied and submitted manually.
        </p>

        <div className="mt-8 grid lg:grid-cols-2 gap-6">
          {platforms.map((platform) => (
            <div
              key={platform.id}
              className="bg-white rounded-3xl shadow-sm border border-green-100 p-8"
            >
              <h2 className="text-2xl font-bold text-gray-900">
                {platform.name}
              </h2>

              <p className="mt-4 text-gray-600 leading-relaxed">
                {platform.purpose}
              </p>

              <div className="mt-5 bg-green-50 rounded-2xl p-5">
                <p className="text-sm font-semibold text-green-700">
                  Suggested Action
                </p>
                <p className="mt-2 text-gray-700">{platform.action}</p>
              </div>

              <a
                href={platform.link}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-6 bg-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-green-800 transition"
              >
                Open Platform
              </a>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-sm border border-green-100 p-8">
          <h2 className="text-2xl font-bold text-gray-900">
            Recommended Complaint Submission Steps
          </h2>

          <div className="mt-6 grid gap-4">
            {steps.map((step, index) => (
              <div key={step} className="flex gap-4 items-start">
                <span className="bg-green-700 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </span>
                <p className="text-gray-700 pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 bg-yellow-50 border border-yellow-200 rounded-3xl p-8">
          <h2 className="text-2xl font-bold text-yellow-800">
            Important Note
          </h2>

          <p className="mt-3 text-yellow-900 leading-relaxed">
            This project is a student demo and awareness platform. It helps users
            prepare better complaint content, but final complaint submission must
            be done by the user through official platforms.
          </p>
        </div>
      </section>
    </main>
  );
}

export default GovernmentHelp;