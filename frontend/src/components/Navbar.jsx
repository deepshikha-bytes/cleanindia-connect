import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const navLinks = [
  { path: "/", label: "Home" },
  { path: "/report", label: "Report Issue" },
  { path: "/reports", label: "Reports" },
  { path: "/dashboard", label: "Dashboard" },
  { path: "/complaint", label: "Complaint" },
  { path: "/tips", label: "Tips" },
  { path: "/government-help", label: "Gov Help" },
];

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    isActive
      ? "text-green-700 font-semibold"
      : "text-gray-700 hover:text-green-700";

  return (
    <nav className="bg-white shadow-sm border-b border-green-100 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-green-700">
          CleanIndia Connect
        </Link>

        <div className="hidden lg:flex gap-6 text-sm font-medium">
          {navLinks.map((link) => (
            <NavLink key={link.path} to={link.path} className={linkClass}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden border border-green-200 px-4 py-2 rounded-xl text-green-700 font-semibold"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t border-green-100 px-6 py-4">
          <div className="grid gap-4 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={linkClass}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;