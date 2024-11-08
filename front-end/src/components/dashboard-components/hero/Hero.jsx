"use client";

import LoginLogoWhite from "@/components/login/LoginLogoWhite";
import ArrowUp from "./arrowUpDown/ArrowUp";
import ArrowDown from "./arrowUpDown/ArrowDown";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";
import HomeIcon from "@/components/record/icon/HomeIcon";
import { useEffect, useState } from "react";
import { BACKEND_ENDPOINT } from "@/constant/constant";
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

const Hero = () => {
  const [records, setRecords] = useState([]);
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
  const fetchCategory = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/category`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const responseData = await response.json();
      setCategories(responseData || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Error occurred while fetching categories.");
    }
  };
  useEffect(() => {
    fetchRecords();
    fetchCategory();
  }, []);
  return (
    <div className="w-full bg-gray-100">
      <div className="container max-w-[1260px] m-auto h-screen pt-[80px]">
        <div className="flex gap-5">
          <div className="w-1/3 h-[216px] bg-[#0166FF]  rounded-2xl">
            <div className="flex pt-10 px-10 gap-2 items-center">
              <LoginLogoWhite />
              <p className="text-[#FFFFFF] text-[24px] font-bold">Geld</p>
            </div>
            <div>
              <p className="text-gray-400 pt-[50px] pl-10">Cash</p>
              <p className="text-white pt-2 pl-10">10000</p>
            </div>
          </div>
          <div className="w-1/3 h-[216px] bg-[#FFFFFF] rounded-2xl">
            <div className="flex p-3 gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-green-500"></div>
              <p className="text-neutral-900 text-base font-semibold p-2">
                Your Income
              </p>
            </div>
            <hr />
            <p className="text-4xl pl-4 pt-4">120000</p>
            <p className="pl-4 text-gray-400 text-lg">Your Income Amount</p>
            <div className="flex gap-2 items-center pl-4 pt-4">
              <ArrowUp />
              <p className="text-lg">32% from last month</p>
            </div>
          </div>
          <div className="w-1/3 h-[216px] bg-[#FFFFFF] rounded-2xl">
            <div className="flex p-3 gap-2 items-center">
              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
              <p className="text-neutral-900 text-base font-semibold p-2">
                Total Expenses
              </p>
            </div>
            <hr />
            <p className="text-4xl pl-4 pt-4">- 110000</p>
            <p className="pl-4 text-gray-400 text-lg">Your Income Amount</p>
            <div className="flex gap-2 items-center pl-4 pt-4">
              <ArrowDown />
              <p className="text-lg">32% from last month</p>
            </div>
          </div>
        </div>
        <div className="flex gap-[150px]">
          <BarChart />
          <PieChart />
        </div>
        <div>
          <div className="card bg-base-100 border-b-2 h-17 place-items-start p-4 mt-4">
            <p className="text-lg font-bold">Last Record</p>
          </div>
          <div className="card bg-base-100 border-b-2 h-15 flex flex-col justify-between overflow-auto h-[30vh]">
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
                    {record.transaction_type === "EXP" ? "-" : "+"}{" "}
                    {record.amount}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
