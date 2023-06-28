import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistic = ({ month, setMonth }) => {
  // const [month, setMonth] = useState("march");
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
  return (
    <div style={{ background: "#EDF7F7" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h1>Statistics- {month.toUpperCase()}</h1>&nbsp;&nbsp;&nbsp;&nbsp;
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
