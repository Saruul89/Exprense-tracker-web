"use client";

import AddCategoryModal from "./addRecordAll/AddCategoryModal";
import AddRecordModal from "./AddRecordModal";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useEffect, useState } from "react";
import Search from "./search/Search";

const RecordsMenu = ({
  records,
  setTranType,
  setCateType,
  categories,
  tranType,
  setRecords, // 新しいプロパティとしてsetRecordsを追加
}) => {
  const [filterCate, setFilterCate] = useState({});

  // トランザクションタイプの変更を管理
  const handleChange = (value) => {
    setTranType(value);
  };

  // チェックボックスの変更を管理する
  const handleCheckboxChange = (categoryId) => {
    setFilterCate((prevState) => ({
      ...prevState,
      [categoryId]: !prevState[categoryId], // チェックが入った場合、状態を反転
    }));
  };

  // カテゴリとトランザクションタイプに基づいてデータをフェッチ
  const fetchFilteredRecords = async () => {
    try {
      const selectedCategories = Object.keys(filterCate).filter(
        (key) => filterCate[key]
      );
      const url = `${BACKEND_ENDPOINT}/records?category=${JSON.stringify(
        selectedCategories
      )}&type=${tranType}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.success) {
        setRecords(data.data);
      } else {
        console.error("Failed to fetch records:", data.error);
      }
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  // フィルターが変更されるたびにデータをフェッチ
  // RecordsMenu内
  useEffect(() => {
    const selectedCategories = Object.keys(filterCate).filter(
      (key) => filterCate[key]
    );
    setCateType(selectedCategories); // `cateType`を更新
  }, [filterCate]);

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
              value="all"
              className="radio checked:bg-red-500"
              checked={tranType === "all"}
              onChange={() => handleChange("all")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Income</span>
            <input
              type="radio"
              name="radio-10"
              value="INC"
              className="radio checked:bg-blue-500"
              checked={tranType === "INC"}
              onChange={() => handleChange("INC")}
            />
          </label>
        </div>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">Expense</span>
            <input
              type="radio"
              name="radio-10"
              value="EXP"
              className="radio checked:bg-blue-500"
              checked={tranType === "EXP"}
              onChange={() => handleChange("EXP")}
            />
          </label>
        </div>
      </div>

      {/* Category */}
      <div className="flex justify-between mb-2">
        <h2 className="text-base font-semibold ">Category</h2>
        <button onClick={() => setFilterCate({})}>Clear</button>
        {/* フィルタークリア機能 */}
      </div>

      <div>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3 mb-2">
              <label className="swap swap-flip w-[35px] h-[35px] ">
                <input
                  type="checkbox"
                  checked={filterCate[category.id] || false}
                  onChange={() => handleCheckboxChange(category.id)} // チェックボックスの状態を管理
                />
                <div className="swap-on">
                  <img
                    className="w-[25px]"
                    src="https://cdn-icons-png.flaticon.com/128/159/159604.png"
                    alt=""
                  />
                </div>
                <div className="swap-off">
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
