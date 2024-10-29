"use client";

import { useEffect, useState } from "react";
import LeftArrow from "./icon/LeftArrow";
import RightArrow from "./icon/RightArrow";
import { BACKEND_ENDPOINT } from "@/constant/constant";

const RecordsHero = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const fetchRecords = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/records`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const responseData = await response.json();
      setRecords(responseData);
    } catch (error) {
      console.error(error);
      setError("Error occurred while fetching records.");
    }
  };

  useEffect(() => {
    fetchRecords();
  }, [records]);

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
  }, [categories]);

  return (
    <div className="container">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <LeftArrow />
          <p className="mt-1">Last 30 days</p>
          <RightArrow />
        </div>
        <div>
          <select
            className="select select-bordered w-full max-w-xs"
            defaultValue="Newest first"
          >
            <option disabled value="Newest first">
              Newest first
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div>
      </div>
      {records.length > 0 ? (
        records.map((record, index) => (
          <div
            key={index}
            className="card bg-base-100 rounded-box h-15 flex flex-col mt-4"
          >
            <div className="flex items-center justify-between p-3">
              {categories.map((category) => {
                if (category.id === record.category_id) {
                  return (
                    <span key={category.id}>{category.category_icon}</span>
                  );
                }
                return null;
              })}
              <p>{record.name}</p>
              <p
                className={`flex items-center p-3 font-bold ${
                  record.transaction_type === "EXP"
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {record.transaction_type === "EXP" ? "-" : "+"} {record.amount}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-red-400 font-bold">
          Reading... or No records available.
        </p>
      )}
    </div>
  );
};
export default RecordsHero;
