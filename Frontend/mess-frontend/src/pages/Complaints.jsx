import { useEffect, useState } from "react";
import API from "../services/api";

function Complaints() {

  const [complaints, setComplaints] = useState([]);
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    loadComplaints();
  }, []);

  const loadComplaints = async () => {
    try {
      const res = await API.get("/Complaints");
      setComplaints(res?.data || []);
    } catch (err) {
      console.log(err);
      setComplaints([]);
    }
  };

  // ADD / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text) return;

    try {
      if (editId) {
        await API.put(`/Complaints/${editId}`, {
          id: editId,
          description: text
        });
        setEditId(null);
      } else {
        await API.post("/Complaints", {
          description: text
        });
      }

      setText("");
      loadComplaints();

    } catch (err) {
      console.log(err);
    }
  };

  // DELETE
  const handleDelete = async (id) => {
    try {
      await API.delete(`/Complaints/${id}`);
      loadComplaints();
    } catch (err) {
      console.log(err);
    }
  };

  // SEARCH
  const filtered = complaints.filter(c =>
    c.description?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: "20px" }}>

      <h2>Complaints Management</h2>

      {/* SEARCH */}
      <input
        placeholder="Search complaints..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          padding: "8px",
          marginBottom: "10px",
          width: "250px"
        }}
      />

      {/* FORM */}
      <div style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        marginBottom: "20px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Write complaint..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows="3"
            style={{
              width: "100%",
              padding: "10px",
              marginBottom: "10px"
            }}
          />

          <button style={{
            padding: "10px 15px",
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            borderRadius: "6px"
          }}>
            {editId ? "Update Complaint" : "Add Complaint"}
          </button>
        </form>
      </div>

      {/* TABLE */}
      <div style={{
        background: "#fff",
        padding: "15px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Complaint</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.description}</td>
                  <td>
                    <button
                      onClick={() => {
                        setEditId(c.id);
                        setText(c.description);
                      }}
                      style={{
                        marginRight: "5px",
                        background: "green",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px"
                      }}
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(c.id)}
                      style={{
                        background: "red",
                        color: "#fff",
                        border: "none",
                        padding: "5px 10px",
                        borderRadius: "5px"
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  No complaints found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default Complaints;