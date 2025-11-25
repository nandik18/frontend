import { useState } from "react";
import RestaurantManager from "./RestaurantManager"
import ExpenseManager from "./ExpenseManager";
import FilterManager from "./FilterManager";
// import './App.css'
// import './App2.css' 

function App() {
  const [Htab,setHtab] = useState("null")
  const [tab, setTab] = useState("restaurants");
  // const [tab2,setTab2] = useState("Exp")

  return (
    <div>
      <h1>Expense Manager</h1>
      <nav>
        <button onClick={() => setHtab("food")}>Food expenses</button>
        <button onClick={() => setHtab("other")}>Other expenses</button>
      </nav>
      {Htab === "food" &&(
        <>
          <nav>
        <button onClick={() => setTab("restaurants")}>Restaurants</button>
        <button onClick={() => setTab("expenses")}>Expenses</button>
        <button onClick={() => setTab("filter")}>Filter</button>
      </nav>

      {tab === "restaurants" && <RestaurantManager />}
      {tab === "expenses" && <ExpenseManager />}
      {tab === "filter" && <FilterManager />}
        </>
      )}
      {Htab === "other" && (
        <div>
          <h2 style={{ textAlign: "center" }}>Other Expenses Coming Soon</h2>
        </div>
      )}
    </div>
  );
}

export default App;



//  <>
//           <nav>
//             <button onClick={() => setTab2("Exp")}>Expenses</button>
//           </nav>

//           {tab2 === "Exp" && <Otherexp/>}
//         </>