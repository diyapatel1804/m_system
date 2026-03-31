import { useEffect, useState } from "react";
import API from "../services/api";
import "./Inventory.css";

function Inventory() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await API.get("/Inventory");
      setItems(res?.data || []);
    } catch (err) {
      console.log(err);
      setItems([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !quantity) return;

    const data = { itemName: name, quantity: Number(quantity), unit };

    try {
      if (editId) {
        await API.put(`/Inventory/${editId}`, data);
        setEditId(null);
      } else {
        await API.post("/Inventory", data);
      }
      setName("");
      setQuantity("");
      setUnit("kg");
      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/Inventory/${id}`);
      fetchItems();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setName(item.itemName);
    setQuantity(item.quantity);
    setUnit(item.unit);
  };

  // SEARCH FILTER
  const filtered = items.filter((i) =>
    i.itemName.toLowerCase().includes(search.toLowerCase())
  );

  // TOTAL STOCK
  const totalQuantity = items.reduce((sum, i) => sum + Number(i.quantity), 0);

  return (
    <div className="inventory-container">
      <h2 className="title">Inventory Management</h2>

      {/* Search & Stats */}
      <div className="inventory-header">
        <input
          type="text"
          placeholder="Search items..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search"
        />
        <div className="stats">
          <div>Total Items: {items.length}</div>
          <div>Total Quantity: {totalQuantity}</div>
        </div>
      </div>

      {/* FORM */}
      <div className="form-card">
        <form onSubmit={handleSubmit} className="form-grid">
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
          <select value={unit} onChange={(e) => setUnit(e.target.value)}>
            <option value="kg">kg</option>
            <option value="litre">litre</option>
            <option value="pcs">pcs</option>
          </select>
          <button className="btn">{editId ? "Update" : "Add"} Item</button>
        </form>
      </div>

      {/* TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((i) => (
                <tr key={i.id} className={i.quantity <= 5 ? "low-stock" : ""}>
                  <td>{i.itemName}</td>
                  <td>{i.quantity}</td>
                  <td>{i.unit}</td>
                  <td>
                    <button className="btn-edit" onClick={() => handleEdit(i)}>
                      Edit
                    </button>
                    <button className="btn-delete" onClick={() => handleDelete(i.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  No items found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Inventory;