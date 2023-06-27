import logo from "./logo.svg";
import "./App.css";
import Transactionlist from "./Components/Transactionlist";
import Statistic from "./Components/Statistic";
import BarChart from "./Components/BarChart";
function App() {
  return <div className="App">
    <Transactionlist />
    <Statistic />
    <BarChart/>
  </div>;
}

export default App;
