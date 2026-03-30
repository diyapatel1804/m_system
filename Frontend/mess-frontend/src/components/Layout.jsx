import { NavLink, Outlet } from "react-router-dom";
import { useEffect } from "react";
import "../index.css";

function Layout() {

  // ✅ Load saved theme
  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
    }
  }, []);

  // ✅ Toggle theme
  const toggleTheme = () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <div className="container">

      <div className="sidebar">
        <h2>Mess System</h2>

        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/students">Students</NavLink>
        <NavLink to="/mealmenu">Meal Menu</NavLink>
        <NavLink to="/payments">Payments</NavLink>
        <NavLink to="/complaints">Complaints</NavLink>
        <NavLink to="/attendance">Attendance</NavLink>
      </div>

      <div className="content">

        {/* 🔥 TOP BAR */}
        <div style={{
          display: "flex",
          justifyContent: "flex-end",
          marginBottom: "10px"
        }}>
          <button
            onClick={toggleTheme}
            style={{
              padding: "8px 14px",
              borderRadius: "8px",
              border: "none",
              background: "#6366f1",
              color: "white",
              cursor: "pointer"
            }}
          >
            🌙 Toggle Mode
          </button>
        </div>

        <Outlet />
      </div>

    </div>
  );
}

export default Layout;