import { useEffect, useState } from "react";
import API from "../services/api";
import "./Dashboard.css";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

function Dashboard() {
  const [studentsCount, setStudentsCount] = useState(0);
  const [paymentsCount, setPaymentsCount] = useState(0);
  const [complaintsCount, setComplaintsCount] = useState(0);
  const [attendanceCount, setAttendanceCount] = useState(0);

  const [todayAttendance, setTodayAttendance] = useState(0);
  const [recentComplaints, setRecentComplaints] = useState([]);
  const [pendingComplaints, setPendingComplaints] = useState(0);

  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const students = await API.get("/Students");
      const payments = await API.get("/Payments");
      const complaints = await API.get("/Complaints");
      const attendance = await API.get("/MealAttendances");

      setStudentsCount(students.data.length);
      setPaymentsCount(payments.data.length);
      setComplaintsCount(complaints.data.length);
      setAttendanceCount(attendance.data.length);

      // Today Attendance
      const today = new Date().toISOString().split("T")[0];
      const todayData = attendance.data.filter(
        (a) => a.date && a.date.startsWith(today)
      );
      setTodayAttendance(todayData.length);

      // Recent Complaints
      setRecentComplaints(complaints.data.slice(-3).reverse());

      // Pending Complaints
      const pending = complaints.data.filter(
        (c) => c.status !== "Resolved"
      );
      setPendingComplaints(pending.length);

      // Chart Data (simple monthly mock)
      setChartData([
        { name: "Jan", value: 10 },
        { name: "Feb", value: 20 },
        { name: "Mar", value: 15 },
        { name: "Apr", value: 25 },
      ]);

      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (loading) return <h3>Loading dashboard...</h3>;

  return (
    <div className="dashboard-container">
      <h2 className="dashboard-title">Dashboard</h2>

      {/* CARDS */}
      <div className="dashboard-grid">

        <div className="card blue">
          <span>👨‍🎓</span>
          <h3>Total Students</h3>
          <p>{studentsCount}</p>
        </div>

        <div className="card green">
          <span>💰</span>
          <h3>Payments</h3>
          <p>{paymentsCount}</p>
        </div>

        <div className="card orange">
          <span>📩</span>
          <h3>Complaints</h3>
          <p>{complaintsCount}</p>
        </div>

        <div className="card purple">
          <span>🍽️</span>
          <h3>Attendance</h3>
          <p>{attendanceCount}</p>
        </div>

        <div className="card dark">
          <span>📅</span>
          <h3>Today's Attendance</h3>
          <p>{todayAttendance}</p>
        </div>

        <div className="card red">
          <span>⚠️</span>
          <h3>Pending Complaints</h3>
          <p>{pendingComplaints}</p>
        </div>

      </div>

      {/* CHART */}
      <div className="chart-card">
        <h3>Monthly Overview</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* RECENT COMPLAINTS */}
      <div className="table-card">
        <h3>Recent Complaints</h3>

        <table>
          <thead>
            <tr>
              <th>Message</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentComplaints.map((c, i) => (
              <tr key={i}>
                <td>{c.message || "No message"}</td>
                <td>{c.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Dashboard;