import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Wind, Cloud, Leaf } from "lucide-react";
import Swal from "sweetalert2";

const Navbar = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeMenu, setActiveMenu] = useState("udara");
  const userString = localStorage.getItem("user");
  const name = userString ? JSON.parse(userString).name : "";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleLogout = () => {
    Swal.fire({
      icon: "info",
      title: "Logout Berhasil",
      text: "Sampai jumpa lagi!",
      timer: 1500,
      showConfirmButton: false,
    });

    setTimeout(() => {
      localStorage.removeItem("user");
      localStorage.removeItem("name");
      navigate("/");
    }, 1300);
  };

  const menuClasses = (menuName) =>
    `flex items-center gap-2 text-xl font-medium cursor-pointer px-2 pb-1 transition ${
      activeMenu === menuName
        ? "border-b-2 border-blue-500 text-blue-600 dark:text-blue-400"
        : "text-black dark:text-gray-100"
    }`;

  return (
    <div className="navbar bg-white shadow-sm px-4 dark:bg-gray-800">
      <div className="navbar-start gap-4">
        <button
          className={menuClasses("udara")}
          onClick={() => {
            setActiveMenu("udara");
            navigate("/dashboard");
          }}
        >
          <Wind size={18} />
          Inventarisasi Udara
        </button>
        <button
          className={menuClasses("emisi")}
          onClick={() => {
            setActiveMenu("emisi");
            navigate("/emisi");
          }}
        >
          <Cloud size={18} />
          Inventarisasi Emisi
        </button>
      </div>

      <div className="navbar-center hidden lg:flex">
        <button className="flex items-center gap-2 text-lg font-semibold text-black dark:text-gray-100">
          <Leaf size={20} />
          Skytrack Monitor
        </button>
      </div>

      <div className="navbar-end flex items-center gap-4">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Cari ID Stasiun"
          className="h-8 p-2 w-32 md:w-52 rounded-md border text-sm
             text-black bg-white border-gray-300 
             placeholder:text-gray-500
             dark:text-gray-100 dark:bg-gray-800 dark:border-gray-600 
             dark:placeholder:text-gray-400
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />

        <button className="relative p-2 rounded-full cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 dark:text-gray-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          <span className="badge badge-xs badge-error absolute top-0 right-0"></span>
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            className="flex items-center gap-2 cursor-pointer px-2 py-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
              {name}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-gray-800 dark:text-gray-100"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>

          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-md bg-white dark:bg-gray-800 rounded-box w-52"
          >
            <li>
              <a className="text-sm text-gray-800 dark:text-gray-100 hover:bg-blue-500 hover:text-white rounded-md px-2 py-1 transition">
                Profile
              </a>
            </li>
            <li>
              <a className="text-sm text-gray-800 dark:text-gray-100 hover:bg-blue-500 hover:text-white rounded-md px-2 py-1 transition">
                Settings
              </a>
            </li>
            <li>
              <div className="flex items-center justify-between px-2 py-1 text-sm text-gray-800 dark:text-gray-100 hover:bg-blue-500 hover:text-white rounded-md transition">
                <span>Dark Mode</span>
                <input
                  type="checkbox"
                  id="toggle"
                  name="toggle"
                  className="toggle toggle-sm"
                  checked={isDarkMode}
                  onChange={toggleDarkMode}
                />
              </div>
            </li>
            <li>
              <a
                onClick={handleLogout}
                className="text-sm text-gray-800 dark:text-gray-100 hover:bg-red-500 hover:text-white rounded-md px-2 py-1 transition"
              >
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
