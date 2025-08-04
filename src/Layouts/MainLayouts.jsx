import Navbar from "../components/Layout/Navbar";
import Drawer from "../components/Layout/Drawer";

const MainLayouts = ({ children }) => {
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
