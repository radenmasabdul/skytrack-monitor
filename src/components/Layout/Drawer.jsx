import { useState } from "react";
import {
  LayoutDashboard,
  Gauge,
  Database,
  BarChart,
  Factory,
  AreaChart,
  Leaf,
  Users,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Drawer = () => {
  const [collapsed, setCollapsed] = useState(true);

  const menuItems = [
    {
      label: "Dashboard",
      icon: <LayoutDashboard size={18} />,
      to: "/dashboard",
    },
    { label: "Status Stasiun", icon: <Gauge size={18} />, to: "#" },
    { label: "Data AQMS", icon: <Database size={18} />, to: "#" },
    { label: "Data ISPU", icon: <BarChart size={18} />, to: "#" },
    { label: "Data Emisi", icon: <Factory size={18} />, to: "#" },
    { label: "Modelling", icon: <AreaChart size={18} />, to: "#" },
    { label: "GRK", icon: <Leaf size={18} />, to: "#" },
    { label: "Membership", icon: <Users size={18} />, to: "#" },
  ];

  return (
    <>
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="cursor-pointer fixed top-[84%] left-0 z-50 flex items-center justify-center w-6 h-12 rounded-r-full bg-white shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition"
        >
          <ChevronRight size={24} />
        </button>
      )}

      <div
        className={`relative h-screen transition-all duration-300 bg-white dark:bg-gray-800 ${
          collapsed ? "w-0 overflow-hidden" : "w-64 p-4"
        }`}
      >
        <div className="flex items-center justify-center gap-2 text-md font-bold text-gray-800 dark:text-gray-100 mb-6">
          <Leaf size={20} />
          <span>Skytrack Monitor</span>
        </div>

        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className="flex items-center gap-2 px-3 py-2 rounded-md text-gray-800 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="relative h-screen transition-all duration-300 bg-white dark:bg-gray-800">
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="cursor-pointer absolute top-1 -right-10 flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 transition"
            >
              <ChevronLeft size={24} />
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Drawer;
