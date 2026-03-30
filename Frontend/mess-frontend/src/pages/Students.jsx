import { useState, useEffect } from "react";
import "./Students.css";

function Students() {

  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem("students");
    return saved ? JSON.parse(saved) : [];
  });

  const [rollNo, setRollNo] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [room, setRoom] = useState("");
  const [status, setStatus] = useState("Active");
  const [joiningDate, setJoiningDate] = useState("");
  const [emergency, setEmergency] = useState("");

  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const studentData = {
      id: editId || Date.now(),
      rollNo,
      name,
      email,
      phone,
      room,
      status,
      joiningDate,
      emergency,
    };

    if (editId) {
      setStudents(students.map((s) => (s.id === editId ? studentData : s)));
      setEditId(null);
    } else {
      setStudents([...students, studentData]);
    }

    // clear
    setRollNo("");
    setName("");
    setEmail("");
    setPhone("");
    setRoom("");
    setStatus("Active");
    setJoiningDate("");
    setEmergency("");
  };

  const handleDelete = (id) => {
    setStudents(students.filter((s) => s.id !== id));
  };

  const handleEdit = (s) => {
    setRollNo(s.rollNo);
    setName(s.name);
    setEmail(s.email);
    setPhone(s.phone);
    setRoom(s.room);
    setStatus(s.status);
    setJoiningDate(s.joiningDate);
    setEmergency(s.emergency);
    setEditId(s.id);
  };

  const filtered = students.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.rollNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="students-container">
      <h2 className="title">Students Management</h2>

      {/* SEARCH */}
      <input
        className="search"
        placeholder="Search by name or roll no..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* FORM */}
      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <div className="form-grid">

            <input placeholder="Roll No" value={rollNo} onChange={(e)=>setRollNo(e.target.value)} required />
            <input placeholder="Full Name" value={name} onChange={(e)=>setName(e.target.value)} required />
            <input type="email" placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
            <input placeholder="Phone" value={phone} onChange={(e)=>setPhone(e.target.value)} required />
            <input placeholder="Room No" value={room} onChange={(e)=>setRoom(e.target.value)} required />

            <input type="date" value={joiningDate} onChange={(e)=>setJoiningDate(e.target.value)} required />

            <select value={status} onChange={(e)=>setStatus(e.target.value)}>
              <option>Active</option>
              <option>Inactive</option>
            </select>

            <input placeholder="Emergency Contact" value={emergency} onChange={(e)=>setEmergency(e.target.value)} />

          </div>

          <button className="btn">
            {editId ? "Update Student" : "Add Student"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Roll</th>
              <th>Name</th>
              <th>Room</th>
              <th>Status</th>
              <th>Join Date</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((s) => (
                <tr key={s.id}>
                  <td>{s.rollNo}</td>
                  <td>{s.name}</td>
                  <td>{s.room}</td>

                  <td>
                    <span className={s.status === "Active" ? "active" : "inactive"}>
                      {s.status}
                    </span>
                  </td>

                  <td>{s.joiningDate}</td>

                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(s)}>Edit</button>
                    <button className="delete-btn" onClick={() => handleDelete(s.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="no-data">No students found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Students;