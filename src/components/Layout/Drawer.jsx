import { useState } from "react";
import { Menu, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const Drawer = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`bg-base-200 transition-all duration-300 h-full p-4 ${
        collapsed ? "w-20" : "w-64"
      }`}
    >
      <div className="flex justify-between items-center mb-6">
        {!collapsed && <span className="font-bold text-xl">SkyTrack</span>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="btn btn-ghost btn-sm"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <ul className="menu space-y-2">
        <li>
          <Link to="/dashboard" className="flex items-center gap-2">
            <Menu size={18} />
            {!collapsed && "Dashboard"}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
