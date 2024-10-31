"use client";

import AddCategoryModal from "./addRecordAll/AddCategoryModal";
import AddRecordModal from "./AddRecordModal";
import EyeIcon from "./icon/EyeIcon";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useEffect, useState } from "react";
import RecordsHero from "./RecordsHero";
import Search from "./search/Search";

const RecordsMenu = () => {
  const [records, setRecords] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

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
      setCategories(responseData);
    } catch (error) {
      console.error(error);
      setError("Error occurred while fetching categories.");
    }
  };

  useEffect(() => {
    fetchCategory();
    fetchRecords();
  }, []);

  const filteredRecords = records.filter((record) => {
    if (filter === "all") return true;
    if (filter === "INC") return record.type === "INC";
    if (filter === "EXP") return record.type === "EXP";
    return false;
  });

  return (
    <div className="w-[282px] border rounded-lg p-5 h-auto flex flex-col gap-5 bg-white">
      <h2 className="font-semibold text-2xl">Records</h2>

      <button
        className="btn bg-info rounded-full"
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
        + Add
      </button>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-10 top-10">
              ✕
            </button>
          </form>
          <AddRecordModal />
        </div>
      </dialog>

      <Search />

      <div>
        <h2 className="text-base font-semibold mb-5">Types</h2>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">All</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-red-500"
              defaultChecked
              onChange={() => setFilter("all")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Income</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              onChange={() => setFilter("INC")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Expense</span>
            <input
              type="radio"
              name="radio-10"
              className="radio checked:bg-blue-500"
              onChange={() => setFilter("EXP")}
            />
          </label>
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <h2 className="text-base font-semibold ">Category</h2>
        <button>clear</button>
      </div>

      <div>
        {categories.length > 0 ? (
          categories.map((category, index) => (
            <div key={index} className="flex items-center gap-3 mb-2">
              <EyeIcon />
              <p>{category.name}</p>
            </div>
          ))
        ) : (
          <p className="text-red-400 font-bold">
            Reading... or No categories available.
          </p>
        )}
      </div>
      <AddCategoryModal />
    </div>
  );
};
export default RecordsMenu;
