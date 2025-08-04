import { Routes, Route } from "react-router-dom";
import MainLayouts from "../Layouts/MainLayouts";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <MainLayouts>
            <Dashboard />
          </MainLayouts>
        }
      />
    </Routes>
  );
};

export default AppRouter;
