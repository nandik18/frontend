import React, { useState, useEffect } from "react";
import "./App3.css";

function Otherexp() {
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ item: "", amount: "" });

  useEffect(() => {
    fetch("http://localhost:5000/expenses")
      .then(res => res.json())
      .then(data => setExpenses(data))
      .catch(err => console.error("Failed to fetch expenses:", err));
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    fetch("http://localhost:5000/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    })
      .then(res => res.json())
      .then(() => {
        setExpenses([...expenses, form]);
        setForm({ item: "", amount: "" });
      })
      .catch(err => console.error("Failed to add expense:", err));
  };

  return (
    <div className="container">
      <h1>Household Expenses</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item"
          value={form.item}
          onChange={e => setForm({ ...form, item: e.target.value })}
        />
        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={e => setForm({ ...form, amount: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {expenses.map((exp, idx) => (
          <li key={idx}>{exp.item}: ₹{exp.amount}</li>
        ))}
      </ul>
    </div>
  );
}

export default Otherexp;