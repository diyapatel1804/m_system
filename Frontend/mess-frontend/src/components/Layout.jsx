import { Outlet, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Layout.css";

function Layout() {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className={darkMode ? "app dark" : "app"}>

      {/* Sidebar */}
      <div className="sidebar">
        <h2>Mess System</h2>

        <a href="/">Dashboard</a>
        <a href="/students">Students</a>
        <a href="/mealmenu">Meal Menu</a>
        <a href="/payments">Payments</a>
        <a href="/complaints">Complaints</a>
        <a href="/attendance">Attendance</a>

        {/* ✅ ADD THIS */}
        <a href="/inventory">Inventory</a>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="main">

        {/* Topbar */}
        <div className="topbar">
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? "🌞" : "🌙"}
          </button>
        </div>

        {/* Content */}
        <div className="content">
          <Outlet />
        </div>

      </div>
    </div>
  );
}

export default Layout;