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
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [modalStudent, setModalStudent] = useState(null);

  // SAVE DATA
  useEffect(() => {
    localStorage.setItem("students", JSON.stringify(students));
  }, [students]);

  // Add / Edit student
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
    setRollNo(""); setName(""); setEmail(""); setPhone(""); setRoom("");
    setStatus("Active"); setJoiningDate(""); setEmergency("");
  };

  const handleDelete = (id) => setStudents(students.filter(s => s.id !== id));

  const handleEdit = (s) => {
    setRollNo(s.rollNo); setName(s.name); setEmail(s.email); setPhone(s.phone);
    setRoom(s.room); setStatus(s.status); setJoiningDate(s.joiningDate);
    setEmergency(s.emergency); setEditId(s.id);
  };

  // Bulk Actions
  const handleSelect = (id) => {
    setSelectedStudents(prev => prev.includes(id) ? prev.filter(i=>i!==id) : [...prev,id]);
  };
  const handleBulkDelete = () => setStudents(students.filter(s => !selectedStudents.includes(s.id)));
  const handleBulkInactive = () => {
    setStudents(students.map(s => selectedStudents.includes(s.id) ? {...s, status:"Inactive"} : s));
  };

  // Filter & Search
  const filtered = students.filter(
    s => s.name.toLowerCase().includes(search.toLowerCase()) ||
         s.rollNo.toLowerCase().includes(search.toLowerCase()) ||
         s.room.toLowerCase().includes(search.toLowerCase())
  );

  // Sorting
  const [sortKey, setSortKey] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const handleSort = (key) => {
    if (sortKey === key) setSortAsc(!sortAsc);
    else { setSortKey(key); setSortAsc(true); }
  };
  const sorted = [...filtered].sort((a,b)=>{
    if(!sortKey) return 0;
    if(a[sortKey] < b[sortKey]) return sortAsc ? -1 : 1;
    if(a[sortKey] > b[sortKey]) return sortAsc ? 1 : -1;
    return 0;
  });

  // Highlight recent joins
  const isNewJoin = (date) => {
    if(!date) return false;
    const join = new Date(date); 
    const today = new Date();
    const diff = (today-join)/(1000*60*60*24);
    return diff <= 7;
  };

  // Print / Export
  const handlePrint = () => window.print();

  return (
    <div className="students-container">
      <h2 className="title">Students Management</h2>

      <div className="top-actions">
        <input
          className="search"
          placeholder="Search by name, roll or room..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {selectedStudents.length>0 && (
          <div className="bulk-actions">
            <button className="btn-delete" onClick={handleBulkDelete}>Delete Selected</button>
            <button className="btn-warning" onClick={handleBulkInactive}>Mark Inactive</button>
          </div>
        )}
        <button className="btn-print" onClick={handlePrint}>🖨️ Print / Export</button>
      </div>

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
          <button className="btn">{editId ? "Update Student" : "Add Student"}</button>
        </form>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th><input type="checkbox" disabled /></th>
              <th onClick={()=>handleSort("rollNo")}>Roll {sortKey==="rollNo"? (sortAsc?"↑":"↓"):""}</th>
              <th onClick={()=>handleSort("name")}>Name {sortKey==="name"? (sortAsc?"↑":"↓"):""}</th>
              <th onClick={()=>handleSort("room")}>Room {sortKey==="room"? (sortAsc?"↑":"↓"):""}</th>
              <th onClick={()=>handleSort("status")}>Status {sortKey==="status"? (sortAsc?"↑":"↓"):""}</th>
              <th onClick={()=>handleSort("joiningDate")}>Join Date {sortKey==="joiningDate"? (sortAsc?"↑":"↓"):""}</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length>0 ? sorted.map(s=>(
              <tr key={s.id} className={isNewJoin(s.joiningDate) ? "new-join" : ""}>
                <td><input type="checkbox" checked={selectedStudents.includes(s.id)} onChange={()=>handleSelect(s.id)} /></td>
                <td>{s.rollNo}</td>
                <td className="name-link" onClick={()=>setModalStudent(s)}>{s.name}</td>
                <td>{s.room}</td>
                <td><span className={s.status==="Active"?"active":"inactive"}>{s.status}</span></td>
                <td>{s.joiningDate}</td>
                <td>
                  <button className="edit-btn" onClick={()=>handleEdit(s)}>Edit</button>
                  <button className="delete-btn" onClick={()=>handleDelete(s.id)}>Delete</button>
                </td>
              </tr>
            )) : <tr><td colSpan="7" className="no-data">No students found</td></tr>}
          </tbody>
        </table>
      </div>

      {/* Student Modal */}
      {modalStudent && (
        <div className="modal-backdrop" onClick={()=>setModalStudent(null)}>
          <div className="modal-card" onClick={e=>e.stopPropagation()}>
            <h3>{modalStudent.name}</h3>
            <p><b>Roll No:</b> {modalStudent.rollNo}</p>
            <p><b>Email:</b> {modalStudent.email}</p>
            <p><b>Phone:</b> {modalStudent.phone}</p>
            <p><b>Room:</b> {modalStudent.room}</p>
            <p><b>Status:</b> {modalStudent.status}</p>
            <p><b>Joining Date:</b> {modalStudent.joiningDate}</p>
            <p><b>Emergency:</b> {modalStudent.emergency}</p>
            <button className="btn-close" onClick={()=>setModalStudent(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Students;