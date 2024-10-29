import AddCategoryInRecord from "../AddCategoryinRecord";
import AddIconBlue from "../icon/AddIconBlue";

const AddCategoryModal = () => {
  return (
    <div>
      <button
        className="btn btn-primary w-full"
        onClick={() => document.getElementById("my_modal_category").showModal()}
      >
        <AddIconBlue />
        Add category
      </button>
      <AddCategoryInRecord />
    </div>
  );
};
export default AddCategoryModal;
