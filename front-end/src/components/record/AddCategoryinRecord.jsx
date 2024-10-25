const AddCategoryInRecord = () => {
  return (
    <div>
      <dialog id="my_modal_category" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Add Category</h3>
          <input
            type="text"
            placeholder="name"
            className="border p-3 rounded-lg mt-3"
          />
        </div>
      </dialog>
    </div>
  );
};
export default AddCategoryInRecord;
