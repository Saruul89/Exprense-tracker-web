"use client";
import React, { useState } from "react";

const AddRecordModal = () => {
  const [transactionType, setTransactionType] = useState("expense");

  const toggleTransactionType = (type) => {
    setTransactionType(type);
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

      <div className="mb-4">
        <label className="block text-gray-700">Amount</label>
        <input
          type="number"
          placeholder="₮ 000"
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Category</label>
        <select className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
          <option>Choose</option>
          <option>Food</option>
          <option>Rent</option>
        </select>
      </div>

      <div className="flex justify-between mb-4">
        <div className="w-1/2 pr-2">
          <label className="block text-gray-700">Date</label>
          <input
            type="date"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="w-1/2 pl-2">
          <label className="block text-gray-700">Time</label>
          <input
            type="time"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Payee</label>
        <input
          type="text"
          placeholder="Write here"
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Note</label>
        <textarea
          placeholder="Write here"
          className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="3"
        />
      </div>

      <button
        className={`w-full py-2 text-white font-semibold rounded-lg ${
          transactionType === "expense" ? "bg-blue-500" : "bg-green-500"
        }`}
      >
        Add Record
      </button>
    </div>
  );
};

export default AddRecordModal;
