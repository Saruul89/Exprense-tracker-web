"use client";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import React, { useState } from "react";

const AddRecordModal = () => {
  const [transactionType, setTransactionType] = useState("expense");
  const [records, setRecords] = useState({
    name: "",
    amount: "",
    transaction_type: transactionType,
    category: "",
    date: "",
    time: "",
    payee: "",
    note: "",
  });

  const toggleTransactionType = (type) => {
    setTransactionType(type);
    setRecords((prev) => ({ ...prev, transaction_type: type }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecords((prevRecords) => ({ ...prevRecords, [name]: value }));
  };

  const fetchRecords = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/records`);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      console.log("Fetched records:", data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Record</h2>

      <div className="flex justify-between mb-4">
        <button
          className={`w-1/2 py-2 text-center font-semibold rounded-l-lg ${
            transactionType === "expense"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => toggleTransactionType("expense")}
        >
          Expense
        </button>
        <button
          className={`w-1/2 py-2 text-center font-semibold rounded-r-lg ${
            transactionType === "income"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => toggleTransactionType("income")}
        >
          Income
        </button>
      </div>

      <form onSubmit={fetchRecords}>
        <div className="mb-4">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={records.amount}
            onChange={handleInputChange}
            placeholder="₮ 000"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            name="category"
            value={records.category}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Choose</option>
            <option value="Food">Food</option>
            <option value="Rent">Rent</option>
          </select>
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-1/2 pr-2">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={records.date}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="w-1/2 pl-2">
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              name="time"
              value={records.time}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Payee</label>
          <input
            type="text"
            name="payee"
            value={records.payee}
            onChange={handleInputChange}
            placeholder="Write here"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <textarea
            name="note"
            value={records.note}
            onChange={handleInputChange}
            placeholder="Write here"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          />
        </div>

        <button
          type="submit"
          className={`w-full py-2 text-white font-semibold rounded-lg ${
            transactionType === "expense" ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AddRecordModal;
