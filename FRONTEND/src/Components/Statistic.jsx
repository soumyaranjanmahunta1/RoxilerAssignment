import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistic = () => {
  const [month, setMonth] = useState("march");
  const [staticdata, setData] = useState({});
  const [totalamount, settotalamount] = useState(1000);
  useEffect(() => {
    fetchData();
  }, [month, totalamount]);

  const fetchData = async () => {
    try {
      const response = await axios
        .get(`http://localhost:8000/statistics?month=${month}`)
        .then((response) => {
          setData(response.data);
          settotalamount(response.data.totalSaleAmount[0].totalSaleAmount);
        });

      console.log();
    } catch (error) {
      console.log(error);
    }
  };

  const changeMonth = (e) => {
    setMonth(e.target.value);
  };
  return (
    <div style={{ background: "#EDF7F7" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Statistics-</h1>&nbsp;&nbsp;&nbsp;&nbsp;
        <select
          onChange={changeMonth}
          style={{ height: "50px", background: "#FFFFFF", marginTop: "16px" }}
        >
          <option value="march">March</option>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">October</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
      </div>
      <div style={{ display: "grid", justifyContent: "center" }}>
        <div
          style={{
            background: "#FEBD40",
            borderRadius: "200px",
            width: "300px",
            height: "150px",
            padding: "20px",
            marginTop: "10px",
          }}
        >
          <p>Total sale {totalamount}</p>
          <p>Total sold item {staticdata.totalSoldItems}</p>
          <p>Total not sold item {staticdata.totalUnsoldItems}</p>
        </div>
      </div>
    </div>
  );
};
export default Statistic;
