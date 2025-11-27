import { useState } from "react";
import RestaurantManager from "./RestaurantManager"
import ExpenseManager from "./ExpenseManager";
import FilterManager from "./FilterManager";
import InstallPrompt from "./InstallPrompt";
// import './App.css'
// import './App2.css' 

function App() {
  const [Htab,setHtab] = useState("null")
  const [tab, setTab] = useState("restaurants");
  const [history, setHistory] = useState([])
  const [showExitPopup, setShowExitPopup] = useState(false);

  const changeTab = (newTab) => {
    setHistory((prev) => [...prev, tab]);         // push current tab before switching
    setTab(newTab);
  };

  const goBack = () => {
    setHistory((prev) => {
      if (prev.length > 0) {
        const newHistory = prev.slice(0, -1);      // remove last tab
        setTab(prev[prev.length - 1]);             // go to last tab
        return newHistory;
      } else {
        // No history left → show exit popup
        setShowExitPopup(true);
        return prev;
      }
    });
  };

  const handleExit = () => {
    // For web apps, you can redirect or close window
    window.close(); // may not work in all browsers
    // Alternative: navigate to a "Goodbye" page
    // window.location.href = "/exit";
  };

  const handleCancel = () => {
    setShowExitPopup(false);
  };


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
        <button onClick={() => changeTab("restaurants")}>Restaurants</button>
        <button onClick={() => changeTab("expenses")}>Expenses</button>
        <button onClick={() => changeTab("filter")}>Filter</button>
      </nav>
      <nav>
        <button onClick={() => setTab("restaurants")}>&#x2302;</button>
        <button onClick={goBack}>&#x2190;</button>
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
      {showExitPopup && (
  <div style={{
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    background: "white",
    padding: "20px",
    border: "1px solid black",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    zIndex: 1000
  }}>
    <p>Do you want to exit the app?</p>
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      marginTop: "10px"
    }}>
      <button onClick={handleExit}>Exit</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  </div>
  )}

      <nav><InstallPrompt/></nav>
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