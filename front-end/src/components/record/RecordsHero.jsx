"use client";

import {
  FaHome,
  FaUser,
  FaCar,
  FaCamera,
  FaAnchor,
  FaBasketballBall,
} from "react-icons/fa";
import { PiBowlFoodFill, PiExamFill } from "react-icons/pi";
import { IoIosMic } from "react-icons/io";
import { RiStockLine } from "react-icons/ri";
import LeftArrow from "./icon/LeftArrow";
import RightArrow from "./icon/RightArrow";

const icons = {
  Home: <FaHome />,
  Stock: <RiStockLine />,
  Food: <PiBowlFoodFill />,
  User: <FaUser />,
  Car: <FaCar />,
  Camera: <FaCamera />,
  Anchor: <FaAnchor />,
  Karaoke: <IoIosMic />,
  Basketball: <FaBasketballBall />,
  Exam: <PiExamFill />,
};

const RecordsHero = ({ records, categories }) => {
  if (!records) {
    return (
      <div className="text-center">
        <p className="text-red-400 font-bold">Loading records...</p>
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center">
        <p className="text-red-400 font-bold">No records available.</p>
      </div>
    );
  }

  return (
    <div className="container overflow-auto h-[70vh]">
      {/* <div className="flex justify-between">
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
            <option>Oldest first</option>
            <option>Amount</option>
          </select>
        </div>
      </div> */}

      {/* Render records */}
      {records.map((record) => (
        <div
          key={record.id}
          className="card bg-base-100 rounded-box h-15 flex flex-col mt-4"
        >
          <div className="flex items-center p-3 justify-between">
            <div className="flex gap-8">
              {categories.map((category) => {
                if (category.id === record.category_id) {
                  return (
                    <span
                      key={category.id}
                      className={`p-2 rounded-lg ${category.icon_color}`}
                    >
                      {icons[category.category_icon]}
                    </span>
                  );
                }
                return null;
              })}
              <p>{record.name}</p>
            </div>

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
      ))}
    </div>
  );
};

export default RecordsHero;
