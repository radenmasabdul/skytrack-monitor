import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/login";
import Dashboard from "../pages/dashboard/dashboard";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRouter;
