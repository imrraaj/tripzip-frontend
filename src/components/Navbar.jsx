import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../context/AuthContext";

export default function Navbar() {
  const { user, setUser } = useUser();
  const navig = useNavigate();
  return (
    <nav className="bg-white px-2 sm:px-4 py-2.5 dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-xl font-semibold whitespace-nowrap ">
            TRIPZIP
          </span>
        </a>
        <div className="flex md:order-2">
          {user.isLoggedin && (
            <button
              onClick={() => {
                if (user) {
                  localStorage.removeItem("token");
                  setUser({ isLoggedin: false, username: null });
                }
                navig("/login");
              }}
              className=" bg-teal-200 px-4 py-3 rounded text-teal-900 hover:bg-teal-400 trasnition font-bold"
              style={{ fontFamily: "Inter" }}
            >
              Logout
            </button>
          )}
          <button
            type="button"
            className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="font-bold text-lg py-3 px-4 text-teal-600 rounded"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/search"
                className="font-bold text-lg py-3 px-4 text-teal-600 rounded"
              >
                Search
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard"
                className="font-bold text-lg py-3 px-4 text-teal-600 rounded"
                aria-current="page"
              >
                Dashboard
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
