import { useEffect, useState } from "react";
import API from "../services/api";
import "./Payments.css";

function Payments() {

  const [payments, setPayments] = useState([]);
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentDate, setPaymentDate] = useState("");

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadPayments();
    loadStudents();
  }, []);

  const loadPayments = async () => {
    const res = await API.get("/Payments");
    setPayments(res.data);
  };

  const loadStudents = async () => {
    const res = await API.get("/Students");
    setStudents(res.data);
  };

  // ✅ ADD / UPDATE (FIXED DATE FORMAT)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!studentId || !amount || !paymentDate) return;

    const data = {
      studentId,
      amount,
      paymentDate: paymentDate // ✅ FIXED
    };

    if (editId) {
      await API.put(`/Payments/${editId}`, { id: editId, ...data });
      setEditId(null);
    } else {
      await API.post("/Payments", data);
    }

    setStudentId("");
    setAmount("");
    setPaymentDate("");

    loadPayments();
  };

  // ❌ DELETE
  const handleDelete = async (id) => {
    await API.delete(`/Payments/${id}`);
    loadPayments();
  };

  // 🔍 SEARCH
  const filtered = payments.filter(p =>
    p.studentId.toString().includes(search)
  );

  // 💰 TOTAL
  const totalAmount = payments.reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <div className="payments-container">

      <h2 className="title">Payments Management</h2>

      {/* STATS */}
      <div className="stats">
        <div>Total Payments: {payments.length}</div>
        <div>Total Amount: ₹{totalAmount}</div>
      </div>

      {/* SEARCH */}
      <input
        className="search"
        placeholder="Search by Student ID..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <select
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              required
            >
              <option value="">Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />

            {/* ✅ SINGLE DATE INPUT */}
            <input
              type="date"
              value={paymentDate}
              onChange={(e) => setPaymentDate(e.target.value)}
              required
            />

          </div>

          <button className="btn">
            {editId ? "Update Payment" : "Add Payment"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => {
                const student = students.find(s => s.id === p.studentId);

                return (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{student ? student.name : p.studentId}</td>
                    <td>₹{p.amount}</td>

                    {/* ✅ FIXED DATE DISPLAY */}
                    <td>
                      {p.paymentDate
                        ? new Date(p.paymentDate + "T00:00:00").toLocaleDateString("en-IN")
                        : "-"}
                    </td>

                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => {
                          setEditId(p.id);
                          setStudentId(p.studentId);
                          setAmount(p.amount);
                          setPaymentDate(p.paymentDate?.slice(0,10));
                        }}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No payments found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Payments;