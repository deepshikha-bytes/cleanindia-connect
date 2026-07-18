function Footer() {
  return (
    <footer className="bg-white border-t border-green-100 px-6 py-8">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-center">
        <div>
          <h2 className="text-xl font-bold text-green-700">
            CleanIndia Connect
          </h2>
          <p className="text-gray-600 mt-2">
            A civic-tech sustainability platform for cleaner communities and
            responsible citizen action.
          </p>
        </div>

        <div className="md:text-right">
          <p className="text-gray-700 font-medium">
            Report. Raise. Resolve.
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Built as a student social-impact project using React, Azure, and
            agentic engineering.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;