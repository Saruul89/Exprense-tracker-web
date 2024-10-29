"use client";

import AddCategoryModal from "./addRecordAll/AddCategoryModal";
import AddRecordModal from "./AddRecordModal";
import EyeIcon from "./icon/EyeIcon";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useEffect, useState } from "react";

const RecordsMenu = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

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

      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" placeholder="Search" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
            clipRule="evenodd"
          />
        </svg>
      </label>
      <div>
        <h2 className="text-base font-semibold mb-5">Types</h2>
        <div className="form-control flex items-start">
          <label className="label cursor-pointer flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                defaultChecked
                className="checkbox rounded-full"
              />
              <span className="label-text">All</span>
            </div>
          </label>
        </div>
        <div className="form-control flex items-start">
          <label className="label cursor-pointer flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="checkbox rounded-full" />
              <span className="label-text">Income</span>
            </div>
          </label>
        </div>
        <div className="form-control flex items-start">
          <label className="label cursor-pointer flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <input type="checkbox" className="checkbox rounded-full" />
              <span className="label-text">Expense</span>
            </div>
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
