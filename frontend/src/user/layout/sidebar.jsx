// src/components/Sidebar.jsx
import React, { useState } from "react";

const Sidebar = () => {
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isPagesMenuOpen, setIsPagesMenuOpen] = useState(false);

  const toggleSideMenu = () => setIsSideMenuOpen(!isSideMenuOpen);
  const togglePagesMenu = () => setIsPagesMenuOpen(!isPagesMenuOpen);
  const closeSideMenu = () => setIsSideMenuOpen(false);

  return (
    <>
      {/* Desktop Sidebar */}

      <aside
        className="z-20 hidden w-62 overflow-y-auto md:block flex-shrink-0 dark:bg-gray-800"
        style={{ backgroundColor: "oklch(25.7% 0.09 281.288)" }}
      >
        <div className="py-4 text-gray-500 dark:text-gray-400">
          {/* <a
            href="#"
            className="ml-6 text-lg font-bold text-gray-800 dark:text-gray-200"
          >
            SAMPLE
          </a> */}

          <a
            href="#"
            className="ml-6 text-lg font-bold text-white dark:text-white"
          >
            SAMPLE
          </a>

          {/* Dashboard */}
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <span
                className="absolute inset-y-0 left-0 w-1 bg-purple-600 rounded-tr-lg rounded-br-lg"
                aria-hidden="true"
              ></span>
              <a
                href="/"
                className="inline-flex items-center w-full text-sm font-semibold text-white transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200 dark:text-gray-100"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
                </svg>
                <span className="ml-4">Profile</span>
              </a>
            </li>
          </ul>

          {/* Other Links */}
          <ul>
            <li className="relative px-6 py-3">
              <a
                href="/course"
                className="inline-flex items-center w-full text-sm  text-white font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H9z" />
                </svg>
                <span className="ml-4">Course</span>
              </a>
            </li>

            {/* Pages Dropdown */}
            {/* <li className="relative px-6 py-3">
              <button
                onClick={togglePagesMenu}
                className="inline-flex items-center justify-between w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                aria-haspopup="true"
              >
                <span className="inline-flex items-center">
                  <svg
                    className="w-5 h-5"
                    aria-hidden="true"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M4 5h16v2H4zM4 13h6v6H4zM16 13h4v6h-4z" />
                  </svg>
                  <span className="ml-4">Pages</span>
                </span>
                <svg
                  className={`w-4 h-4 transform transition-transform ${
                    isPagesMenuOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 
                    10.586l3.293-3.293a1 1 0 111.414 
                    1.414l-4 4a1 1 0 
                    01-1.414 0l-4-4a1 1 0 
                    010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              
              {isPagesMenuOpen && (
                <ul className="p-2 mt-2 space-y-2 text-sm font-medium text-gray-500 rounded-md shadow-inner bg-gray-50 dark:text-gray-400 dark:bg-gray-900">
                  <li>
                    <a
                      href="/login"
                      className="block px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Login
                    </a>
                  </li>
                  <li>
                    <a
                      href="/create-account"
                      className="block px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Create Account
                    </a>
                  </li>
                  <li>
                    <a
                      href="/forgot-password"
                      className="block px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Forgot Password
                    </a>
                  </li>
                  <li>
                    <a
                      href="/404"
                      className="block px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      404 Page
                    </a>
                  </li>
                  <li>
                    <a
                      href="/blank"
                      className="block px-2 py-1 hover:text-gray-800 dark:hover:text-gray-200"
                    >
                      Blank Page
                    </a>
                  </li>
                </ul>
              )}
            </li> */}
          </ul>

          {/* Button */}
          {/* <div className="px-6 my-6">
            <button className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium leading-5 text-white bg-purple-600 border border-transparent rounded-lg hover:bg-purple-700 focus:outline-none focus:shadow-outline-purple">
              Create account <span className="ml-2" aria-hidden="true">+</span>
            </button>
          </div> */}
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fixed inset-0 z-10 bg-black bg-opacity-50"
        ></div>
      )}

      <aside
        className={`fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-white dark:bg-gray-800 transform transition-transform duration-150 ${
          isSideMenuOpen ? "translate-x-0" : "-translate-x-64"
        } md:hidden`}
      >
        {/* Same menu duplicated for mobile if needed */}
      </aside>
    </>
  );
};

export default Sidebar;
