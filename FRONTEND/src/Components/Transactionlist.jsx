import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Transactionlist({month,setMonth}) {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = async () => {
    const response = await axios
      .get(`http://localhost:8000/transactions?month=${"may"}&page=${currentPage}&limit=10`)
      .then((response) => {
        setTransactions(response.data.docs);
        setTotalPages(response.data.totalPages);
      });
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const changeMonth = (e) => {
    setMonth(e.target.value);
  }
  return (
    <div id="container">
      <div id="Topcontainer">
        <div
          style={{
            background: "white",
            borderRadius: "100px",
            width: "200px",
            height: "200px",
            display: "flex",
            justifyContent: "center",
            marginLeft: "550px",
          }}
        >
          <h2 style={{ padding: "40px", color: "#676767" }}>
            <span>Transactions</span>
            <br />
            <span>Dashboard</span>
          </h2>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "20px",
          }}
        >
          <input type="text" placeholder="Search transaction" />
          <select onChange={changeMonth}>
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
      </div>
      <div id="Botcontainer">
        <table
          style={{
            background: "#FFE691",
            alignItems: "center",
          }}
        >
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Category</th>
              <th>Sold</th>
              <th>Image</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td>{transaction._id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold == true ? "True" : "False"}</td>
                <td>
                  {<img src={transaction.image} style={{ width: "100%" }} />}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div
        style={{
          display: "inline",
        }}
      >
        <h3>Page No : {currentPage}</h3>
        <button onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous
        </button>
        &nbsp;&nbsp;
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
        <h3>Per Page : {10}</h3>
      </div>
    </div>
  );
}
