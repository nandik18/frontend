import { useState, useEffect } from "react";
import './App.css'

function ExpenseManager() {
  const [expenses, setExpenses] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [restaurantId, setRestaurantId] = useState("");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [mode,setMode] = useState("")
  const [date, setDate] = useState(""); // ✅ New state
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => setExpenses(data));

    fetch("http://localhost:5000/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    if (!restaurantId || !paymentMethod || !mode || !date) {
      return alert("Please fill all fields");
    }

    fetch("http://localhost:5000/api/expenses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ restaurantId, amount, paymentMethod, mode, date }),
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenses((prev) => [...prev, data]);
        setRestaurantId("");
        setAmount("");
        setPaymentMethod("");
        setMode("");
        setDate("");
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/expenses/${id}`, {
      method: "DELETE",
    }).then(() => {
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    });
  };

  const getRestaurantName = (id) => {
    const match = restaurants.find((r) => r._id === id);
    return match ? match.name : "Unknown";
  };

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  return (
    <div>
      <h2>Expenses</h2>
      <form onSubmit={handleAdd}>

        {/* ✅ Date Input */}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <label>Select Restaurant:</label>
        <select
          value={restaurantId}
          onChange={(e) => setRestaurantId(e.target.value)}
        >
          <option value="">-- Choose --</option>
          {restaurants.map((r) => (
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <fieldset style={{ border: "none", margin: "1rem 0" }}>
  <legend style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>Payment Method:</legend>
  <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
    {["Credit Card", "Cash", "UPI"].map((method) => (
      <label key={method} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="radio"
          name="paymentMethod"
          value={method}
          checked={paymentMethod === method}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        {method}
      </label>
    ))}
  </div>
</fieldset>

<fieldset style={{ border: "none", margin: "1rem 0" }}>
  <legend style={{ fontWeight: "bold", marginBottom: "0.5rem" }}>mode of expenses:</legend>
  <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap" }}>
    {["Dine-in", "Delivery"].map((method) => (
      <label key={method} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <input
          type="radio"
          name="mode"
          value={method}
          checked={mode === method}
          onChange={(e) => setMode(e.target.value)}
        />
        {method}
      </label>
    ))}
  </div>
</fieldset>

        <button type="submit">Add Expense</button>
      </form>
      <section>
      <button onClick={() => setShowList(!showList)} style={{ marginTop: "10px" }}>
        {showList ? "Hide Entries" : "Show Entries"}
      </button>
      </section>
      {showList && (
        <table border="1" cellPadding="8" style={{ marginTop: "20px", width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Restaurant</th>
              <th>Amount (₹)</th>
              <th>Payment Method</th>
              <th>Mode</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((e) => (
              <tr key={e._id}>
                <td>{getRestaurantName(e.restaurantId)}</td>
                <td>{e.amount}</td>
                <td>{e.paymentMethod}</td>
                <td>{e.mode}</td>
                <td>{formatDate(e.date)}</td>
                <td>
                  <button onClick={() => handleDelete(e._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ExpenseManager;