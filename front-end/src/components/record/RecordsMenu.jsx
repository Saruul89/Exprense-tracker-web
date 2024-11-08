"use client";

import AddCategoryModal from "./addRecordAll/AddCategoryModal";
import AddRecordModal from "./AddRecordModal";
import Search from "./search/Search";

const RecordsMenu = ({
  setTranType,
  categories,
  tranType,
  selectedCategories,
  setSelectedCategories,
}) => {
  const handleChange = (value) => {
    setTranType(value);
  };

  const handleCheckboxChange = (category_id) => {
    setSelectedCategories((prevState) => {
      if (prevState.includes(category_id)) {
        return prevState.filter((id) => id !== category_id);
      } else {
        return [...prevState, category_id];
      }
    });
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
        <h2 className="text-base font-semibold">Category</h2>
        <button onClick={() => setSelectedCategories([])}>Clear</button>
      </div>

      <div>
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="flex items-center gap-3 mb-2">
              <label className="swap swap-flip w-[35px] h-[35px]">
                <input
                  className="checkbox"
                  type="checkbox"
                  checked={selectedCategories.includes(category.id)}
                  onChange={() => handleCheckboxChange(category.id)}
                />
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
