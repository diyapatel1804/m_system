import { useState, useEffect } from "react";
import "./MealMenu.css";

function MealMenu() {

  // ✅ Load from localStorage
  const [menu, setMenu] = useState(() => {
    const saved = localStorage.getItem("meals");
    return saved ? JSON.parse(saved) : [];
  });

  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [mealType, setMealType] = useState("Breakfast");
  const [mealName, setMealName] = useState("");

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterDate, setFilterDate] = useState("");
  const [editId, setEditId] = useState(null);

  // ✅ Save data
  useEffect(() => {
    localStorage.setItem("meals", JSON.stringify(menu));
  }, [menu]);

  // ✅ Add / Edit
  const addMeal = (e) => {
    e.preventDefault();

    if (editId) {
      setMenu(menu.map((m) =>
        m.id === editId ? { ...m, name, date, mealType, mealName } : m
      ));
      setEditId(null);
    } else {
      const newMeal = {
        id: Date.now(),
        name,
        date,
        mealType,
        mealName,
      };
      setMenu([...menu, newMeal]);
    }

    setName("");
    setDate("");
    setMealType("Breakfast");
    setMealName("");
  };

  // ✅ Delete
  const handleDelete = (id) => {
    setMenu(menu.filter((m) => m.id !== id));
  };

  // ✅ Filter + Search
  const filtered = menu.filter((m) => {
    return (
      (filterType === "All" || m.mealType === filterType) &&
      (filterDate === "" || m.date === filterDate) &&
      m.name.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="meal-container">

      <h2 className="title">Meal Management</h2>

      {/* 🔥 STATS */}
      <div className="stats">
        <div>Total: {menu.length}</div>
        <div>Breakfast: {menu.filter(m=>m.mealType==="Breakfast").length}</div>
        <div>Lunch: {menu.filter(m=>m.mealType==="Lunch").length}</div>
        <div>Dinner: {menu.filter(m=>m.mealType==="Dinner").length}</div>
      </div>

      {/* 🔍 SEARCH */}
      <input
        className="search"
        placeholder="Search by name..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🎯 FILTER */}
      <div className="filters">
        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option>All</option>
          <option>Breakfast</option>
          <option>Lunch</option>
          <option>Dinner</option>
        </select>

        <input
          type="date"
          value={filterDate}
          onChange={(e) => setFilterDate(e.target.value)}
        />
      </div>

      {/* 📝 FORM */}
      <div className="form-card">
        <form onSubmit={addMeal}>
          <div className="form-grid">

            <input
              type="text"
              placeholder="Person Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />

            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />

            <select
              value={mealType}
              onChange={(e) => setMealType(e.target.value)}
            >
              <option>Breakfast</option>
              <option>Lunch</option>
              <option>Dinner</option>
            </select>

            <input
              type="text"
              placeholder="Meal Name"
              value={mealName}
              onChange={(e) => setMealName(e.target.value)}
              required
            />

          </div>

          <button className="btn">
            {editId ? "Update Meal" : "Add Meal"}
          </button>
        </form>

        {/* ⚠️ CLEAR */}
        <button className="clear-btn" onClick={() => setMenu([])}>
          Clear All
        </button>
      </div>

      {/* 📊 TABLE */}
      <div className="table-card">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Date</th>
              <th>Meal</th>
              <th>Dish</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((m) => (
                <tr
                  key={m.id}
                  className={
                    m.date === new Date().toISOString().slice(0,10)
                      ? "today"
                      : ""
                  }
                >
                  <td>{m.name}</td>
                  <td>{m.date}</td>

                  <td>
                    <span className={`badge ${m.mealType.toLowerCase()}`}>
                      {m.mealType}
                    </span>
                  </td>

                  <td>{m.mealName}</td>

                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => {
                        setEditId(m.id);
                        setName(m.name);
                        setDate(m.date);
                        setMealType(m.mealType);
                        setMealName(m.mealName);
                      }}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No meals found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default MealMenu;