import { useState } from "react";
import { NavLink } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const DashboardDropdown = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center justify-center gap-2 bg-PURPLE hover:bg-BLUE text-white font-semibold px-4 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
      >
        Dashboard Actions
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : "rotate-0"
          }`}
          size={18}
        />
      </button>

      {/* Dropdown Menu */}
      {open && (
        <div className="absolute mt-3 right-0 w-56 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-50 overflow-hidden">
          <NavLink
            to="/dashboard/takequiz"
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            Take Splunk Quiz
          </NavLink>

          <NavLink
            to="/dashboard/classmaterials"
            className="block px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition-all duration-200"
            onClick={() => setOpen(false)}
          >
            Assignment
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default DashboardDropdown;
