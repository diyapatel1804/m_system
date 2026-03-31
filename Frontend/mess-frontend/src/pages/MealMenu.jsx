import { useState, useEffect } from "react";
import "./MealMenu.css";

const DAYS = [
  { name: "Monday", icon: "☀️" },
  { name: "Tuesday", icon: "🍳" },
  { name: "Wednesday", icon: "🥗" },
  { name: "Thursday", icon: "🍛" },
  { name: "Friday", icon: "🍝" },
  { name: "Saturday", icon: "🍕" },
  { name: "Sunday", icon: "🌸" },
];

// Default snacks with emojis
const DAILY_SNACKS = {
  Monday: ["🍪 Biscuits", "🫖 Tea", "🧃 Juice"],
  Tuesday: ["🍪 Cookies", "🍎 Fruit Salad"],
  Wednesday: ["🥟 Samosa", "🫖 Tea"],
  Thursday: ["🌶️ Pakora", "🧃 Juice"],
  Friday: ["🥪 Sandwich", "🍟 Chips"],
  Saturday: ["🍞 Bread Toast", "🫖 Tea", "🍪 Cookies"],
  Sunday: ["🍎 Fruit Salad", "🧃 Juice", "🌶️ Pakora"]
};

const DEFAULT_MEALS = {
  breakfast: ["🥣 Oats", "🍳 Eggs", "🫖 Tea"],
  lunch: ["🍛 Rice", "🥗 Salad", "🍗 Chicken"],
  dinner: ["🍲 Soup", "🍝 Pasta", "🥗 Veg Salad"],
  snacks: []
};

function MealMenu() {
  // Admin toggle
  const [isAdmin, setIsAdmin] = useState(false);

  // Get today's day
  const todayIndex = new Date().getDay() === 0 ? 6 : new Date().getDay() - 1;
  const today = DAYS[todayIndex].name;

  const [menu, setMenu] = useState(() => {
    const saved = JSON.parse(localStorage.getItem("weeklyMenu") || "{}");
    return DAYS.reduce((acc, day) => {
      acc[day.name] = {
        breakfast: saved[day.name]?.breakfast || DEFAULT_MEALS.breakfast,
        lunch: saved[day.name]?.lunch || DEFAULT_MEALS.lunch,
        dinner: saved[day.name]?.dinner || DEFAULT_MEALS.dinner,
        snacks: saved[day.name]?.snacks || DAILY_SNACKS[day.name]
      };
      return acc;
    }, {});
  });

  const [selectedDay, setSelectedDay] = useState(today);
  const [expandedMeals, setExpandedMeals] = useState({}); // to track expanded cards

  useEffect(() => {
    localStorage.setItem("weeklyMenu", JSON.stringify(menu));
  }, [menu]);

  const toggleMeal = (meal) => {
    setExpandedMeals(prev => ({
      ...prev,
      [meal]: !prev[meal]
    }));
  };

  // Print menu
  const handlePrint = () => {
    window.print();
  };

  // Admin edit function
  const handleEditMeal = (mealType) => {
    if (!isAdmin) return;
    const newItems = prompt(`Edit ${mealType} for ${selectedDay} (comma separated)`, menu[selectedDay][mealType].join(", "));
    if (newItems !== null) {
      setMenu(prev => ({
        ...prev,
        [selectedDay]: {
          ...prev[selectedDay],
          [mealType]: newItems.split(",").map(item => item.trim())
        }
      }));
    }
  };

  return (
    <div className="meal-container">
      <h2 className="title">Weekly Mess Menu</h2>

      {/* Admin toggle */}
      <div style={{ textAlign: "center", marginBottom: "15px" }}>
        <button className="btn-admin" onClick={() => setIsAdmin(!isAdmin)}>
          {isAdmin ? "Switch to Student View" : "Switch to Admin View"}
        </button>
        <button className="btn-admin" onClick={handlePrint} style={{ marginLeft: "10px" }}>
          🖨️ Print Menu
        </button>
      </div>

      {/* Collapsible Weekly Overview */}
      <div className="weekly-overview">
        {DAYS.map(day => (
          <div 
            key={day.name} 
            className={`overview-day ${day.name === today ? "today" : ""}`}
            onClick={() => setSelectedDay(day.name)}
          >
            <span className="day-icon">{day.icon}</span> {day.name}
          </div>
        ))}
      </div>

      {/* Selected Day Menu */}
      <div className="day-menu">
        <h3>{selectedDay}</h3>
        {["breakfast","lunch","dinner","snacks"].map(mealType => (
          <div 
            key={mealType} 
            className={`meal-card ${mealType}`} 
            onClick={() => toggleMeal(mealType)}
          >
            <p> 
              {mealType === "breakfast" && "🍳 "}
              {mealType === "lunch" && "🍛 "}
              {mealType === "dinner" && "🍽 "}
              {mealType === "snacks" && "🍪 "}
              <b>{mealType.charAt(0).toUpperCase() + mealType.slice(1)}:</b> {menu[selectedDay][mealType].slice(0, expandedMeals[mealType] ? undefined : 2).join(", ")}
              {menu[selectedDay][mealType].length > 2 && !expandedMeals[mealType] ? " ..." : ""}
              {isAdmin && <span className="edit-btn" onClick={(e)=>{ e.stopPropagation(); handleEditMeal(mealType);}}> ✏️</span>}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MealMenu;