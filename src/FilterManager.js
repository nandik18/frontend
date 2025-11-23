import React, { useState, useEffect } from "react";
import './App.css'

function FilterManager() {
  const [restaurants, setRestaurants] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  const [restaurant, setRestaurant] = useState("");
  const [location, setLocation] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [date, setDate] = useState("");
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');


  useEffect(() => {
    fetch("http://localhost:5000/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  const handleSearch = () => {
    fetch("http://localhost:5000/api/expenses")
      .then((res) => res.json())
      .then((data) => {
        setExpenses(data);

        const filtered = data.filter((item) => {
          const matchRestaurant = restaurant ? item.restaurantId === restaurant : true;
          const matchLocation = location
            ? restaurants.find((r) => r._id === item.restaurantId)?.location === location
            : true;
          const matchPayment = paymentMethod ? item.paymentMethod === paymentMethod : true;
          const matchDate =
  startDate && endDate
    ? new Date(item.date) >= new Date(startDate) && new Date(item.date) <= new Date(endDate)
    : true;

          return matchRestaurant && matchLocation && matchPayment && matchDate;
        });

        setFilteredItems(filtered);
      });
  };

  const handleClear = () => {
    setRestaurant("");
    setLocation("");
    setPaymentMethod("");
    setDate("");
    setFilteredItems([]);
    setExpenses([]);
    setStartDate("");
    setEndDate("");
  };

  const uniqueLocations = [...new Set(restaurants.map((r) => r.location))];
  const fixedPaymentMethods = ["Credit Card", "UPI", "Cash"];

  return (
    <div>
      <h2>Filter Expenses</h2>
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap"}}>
        <div>
          <label>Restaurant:</label><br />
          <select value={restaurant} onChange={(e) => setRestaurant(e.target.value)}>
            <option value="">All</option>
            {restaurants.map((r) => (
              <option key={r._id} value={r._id}>{r.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Location:</label><br />
          <select value={location} onChange={(e) => setLocation(e.target.value)}>
            <option value="">All</option>
            {uniqueLocations.map((loc, i) => (
              <option key={i} value={loc}>{loc}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Payment Method:</label><br />
          <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
            <option value="">All</option>
            {fixedPaymentMethods.map((method, i) => (
              <option key={i} value={method}>{method}</option>
            ))}
          </select>
        </div>

        <div>
  <label>Start Date:</label><br />
  <input
    type="date"
    value={startDate}
    onChange={(e) => setStartDate(e.target.value)}
  />
</div>

<div>
  <label>End Date:</label><br />
  <input
    type="date"
    value={endDate}
    onChange={(e) => setEndDate(e.target.value)}
  />
</div>

        <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
          <button onClick={handleSearch}>🔍 Search</button>
          <button onClick={handleClear}>🧹 Clear</button>
        </div>
      </div>

      {/* Tabular Results */}
      {filteredItems.length > 0 ? (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f0f0f0" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Restaurant</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Location</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Payment Method</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Date</th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.map((item) => {
              const restaurantObj = restaurants.find((r) => r._id === item.restaurantId);
              return (
                <tr key={item._id}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {restaurantObj?.name || "Unknown"}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {restaurantObj?.location || "Unknown"}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {item.paymentMethod}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                    {formatDate(item.date)}
                  </td>
                  <td style={{ border: "1px solid #ccc", padding: "8px"}}>
              ₹{parseFloat(item.amount)?.toFixed(2) || "0.00"}
            </td>
                </tr>
              );
            })}
          </tbody>
          <tfoot>
  <tr>
    <td colSpan="4" style={{ textAlign: "right", padding: "8px", fontWeight: "bold" }}>
      Total:
    </td>
    <td style={{ border: "1px solid #ccc", padding: "8px", fontWeight: "bold", textAlign: "right" }}>
      ₹{filteredItems.reduce((sum, item) => sum + parseFloat(item.amount || 0), 0).toFixed(2)}
    </td>
  </tr>
</tfoot>
        </table>
      ) : (
        <p>No expenses found.</p>
      )}
    </div>
  );
}

export default FilterManager;