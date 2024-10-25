"use client";

import LoginLogoWhite from "@/components/login/LoginLogoWhite";
import ArrowUp from "./arrowUpDown/ArrowUp";
import ArrowDown from "./arrowUpDown/ArrowDown";
import BarChart from "../chart/BarChart";
import PieChart from "../chart/PieChart";
import HomeIcon from "@/components/record/icon/HomeIcon";

const Hero = () => {
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
          <div className="card bg-base-100 border-b-2 h-15 flex flex-row justify-between ">
            <div className="flex items-center gap-3 p-3">
              <HomeIcon />
              <p>Lending & Renting</p>
            </div>
            <p className="flex items-center p-3 text-green-600 font-bold">
              + 1000₮
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
