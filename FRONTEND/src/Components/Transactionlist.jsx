import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
export default function Transactionlist() {
  const [transactions, setTransactions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchTransactions = async () => {
    const response = await axios
      .get(`http://localhost:8000/transactions?page=${currentPage}&limit=10`)
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
            marginLeft: "500px",
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
          <select>
            <option value="March">March</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="April">April</option>
            <option value="May">May</option>
            <option value="June">June</option>
            <option value="July">July</option>
            <option value="August">August</option>
            <option value="September">September</option>
            <option value="October">October</option>
            <option value="November">November</option>
            <option value="December">December</option>
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
        <h3>Per Page No : {10}</h3>
      </div>
    </div>
  );
}
