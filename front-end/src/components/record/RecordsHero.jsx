"use client";

import { useEffect, useState } from "react";
import HomeIcon from "./icon/HomeIcon";
import LeftArrow from "./icon/LeftArrow";
import RightArrow from "./icon/RightArrow";
import { BACKEND_ENDPOINT } from "@/constant/constant";

const RecordsHero = () => {
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);

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
  }, []);

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
              {record.category_icon}
              <p>{record.name}</p>
              <p className="flex items-center p-3 text-red-600 font-bold">
                +{record.amount}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p>Reading... or No records available.</p>
      )}
    </div>
  );
};
export default RecordsHero;
