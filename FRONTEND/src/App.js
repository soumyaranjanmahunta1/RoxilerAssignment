import logo from "./logo.svg";
import "./App.css";
import Transactionlist from "./Components/Transactionlist";
import Statistic from "./Components/Statistic";
import BarChart from "./Components/BarChart";
import { useState } from "react";
function App() {
  const [month,setMonth] = useState("march");
  return (
    <div className="App">
      <Transactionlist month={month} setMonth={setMonth} />
      <Statistic month={month} setMonth={setMonth} />
      <BarChart month={month} setMonth={setMonth} />
    </div>
  );
}

export default App;
