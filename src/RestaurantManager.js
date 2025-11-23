import { useState, useEffect } from "react";
import './App.css'

function RestaurantManager() {
  const [restaurants, setRestaurants] = useState([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    fetch("https://backend-kmoh.onrender.com/api/restaurants")
      .then((res) => res.json())
      .then((data) => setRestaurants(data));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    fetch("https://backend-kmoh.onrender.com/api/restaurants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, location }),
    })
      .then((res) => res.json())
      .then((data) => {
        setRestaurants((prev) => [...prev, data]);
        setName("");
        setLocation("");
      });
  };

  const handleDelete = (id) => {
    fetch(`https://backend-kmoh.onrender.com/api/restaurants/${id}`, {
      method: "DELETE",
    }).then(() => {
      setRestaurants((prev) => prev.filter((r) => r._id !== id));
    });
  };

  return (
    <div>
      <h2>Restaurants</h2>
      <form onSubmit={handleAdd}>
        <input
          type="text"
          placeholder="Restaurant Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <button type="submit">Add Restaurant</button>
      </form>
      <section>
      <button onClick={() => setShowList(!showList)}>
        {showList ? "Hide Entries" : "Show Entries"}
      </button>
      </section>
      {showList && (
        <ul>
          {restaurants.map((r) => (
            <li key={r._id}>
              {r.name} ({r.location})
              <button onClick={() => handleDelete(r._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RestaurantManager;