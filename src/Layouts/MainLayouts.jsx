import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Layout/Navbar";
import Drawer from "../components/Layout/Drawer";
import Swal from "sweetalert2";

const MainLayouts = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("user");
    if (!isLoggedIn) {
      Swal.fire({
        icon: "warning",
        title: "Akses ditolak",
        text: "Silakan login terlebih dahulu.",
        timer: 1500,
        showConfirmButton: false,
      });
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <Drawer />
        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  );
};

export default MainLayouts;
