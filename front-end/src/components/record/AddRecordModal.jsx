"use client";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import React, { useEffect, useState } from "react";
import AddCategoryModal from "./addRecordAll/AddCategoryModal";

const AddRecordModal = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [transactionType, setTransactionType] = useState("EXP");
  const [records, setRecords] = useState({
    name: "",
    amount: "",
    transaction_type: transactionType,
    category_id: "",
    description: "",
    createdat: "",
  });

  const toggleTransactionType = (type) => {
    setTransactionType(type);
    setRecords((prev) => ({ ...prev, transaction_type: type }));
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setRecords((prevRecords) => ({ ...prevRecords, [name]: value }));
  };

  const fetchCategory = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/category`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const responseData = await response.json();
      setCategories(responseData);
    } catch (error) {
      console.error(error);
      setError("Error occurred while fetching categories.");
    }
  };

  useEffect(() => {
    fetchCategory();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/records`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(records),
      });

      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      console.log("Record added successfully:");

      setRecords({
        name: "",
        amount: "",
        transaction_type: transactionType,
        category_id: "",
        description: "",
        createdat: "",
      });
    } catch (error) {
      console.error("Error adding record:", error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <h2 className="text-xl font-bold mb-4">Add Record</h2>
      <div className="flex justify-between mb-4">
        <button
          className={`w-1/2 py-2 text-center font-semibold rounded-l-lg ${
            transactionType === "EXP"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => toggleTransactionType("EXP")}
        >
          Expense
        </button>
        <button
          className={`w-1/2 py-2 text-center font-semibold rounded-r-lg ${
            transactionType === "INC"
              ? "bg-green-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => toggleTransactionType("INC")}
        >
          Income
        </button>
      </div>

      <form onSubmit={handleFormSubmit}>
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
            name="category_id"
            value={records.category_id}
            onChange={handleInputChange}
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          <AddCategoryModal />
        </div>

        <div className="flex justify-between mb-4">
          <div className="w-full pr-2">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="createdat"
              value={records.createdat}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          {/* <div className="w-1/2 pl-2">
            <label className="block text-gray-700">Time</label>
            <input
              type="time"
              name="createdat"
              value={records.createdat}
              onChange={handleInputChange}
              className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div> */}
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Payee</label>
          <input
            type="text"
            name="name"
            value={records.name}
            onChange={handleInputChange}
            placeholder="Write here"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Note</label>
          <textarea
            name="description"
            value={records.description}
            onChange={handleInputChange}
            placeholder="Write here"
            className="w-full px-4 py-2 mt-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            rows="3"
          />
        </div>

        <button
          type="submit"
          onClick={() => document.getElementById("my_modal_3").close()}
          className={`w-full py-2 text-white font-semibold rounded-lg ${
            transactionType === "EXP" ? "bg-blue-500" : "bg-green-500"
          }`}
        >
          Add Record
        </button>
      </form>
    </div>
  );
};

export default AddRecordModal;
