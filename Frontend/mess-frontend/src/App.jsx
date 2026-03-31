import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import MealMenu from "./pages/MealMenu";
import Payments from "./pages/Payments";
import Complaints from "./pages/Complaints";
import Attendance from "./pages/Attendance";
import Inventory from "./pages/Inventory";
import Login from "./pages/Login"; // 👈 ADD THIS

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔹 LOGIN ROUTE */}
        <Route path="/login" element={<Login />} />

        {/* 🔹 PROTECTED ROUTES */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} /> {/* added */}
          <Route path="students" element={<Students />} />
          <Route path="mealmenu" element={<MealMenu />} />
          <Route path="payments" element={<Payments />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="/inventory" element={<Inventory />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;