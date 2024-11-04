"use client";

import AddCategoryModal from "./addRecordAll/AddCategoryModal";
import AddRecordModal from "./AddRecordModal";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useEffect, useState } from "react";
import Search from "./search/Search";

const RecordsMenu = ({ records, setTranType, setCateType, categories }) => {
  const [filterCate, setFilterCate] = useState("");

  const handleCheckboxChange = (categoryId) => {
    setFilterCate((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId],
    }));
  };

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
              onChange={() => setFilterCate("all")}
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
              onChange={() => setFilterCate("INC")}
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
              onChange={() => setFilterCate("EXP")}
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
              <label className="swap swap-flip w-[35px] h-[35px] ">
                <input
                  type="checkbox"
                  checked={!filterCate[category.id]}
                  onChange={() => handleCheckboxChange(category.id)}
                />
                <div className="swap-off ">
                  <img
                    className="w-[25px]"
                    src="https://cdn-icons-png.flaticon.com/128/159/159604.png"
                    alt=""
                  />
                </div>
                <div className="swap-on">
                  <img
                    className="w-[25px]"
                    src="https://cdn-icons-png.flaticon.com/128/2767/2767146.png"
                    alt=""
                  />
                </div>
              </label>
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
