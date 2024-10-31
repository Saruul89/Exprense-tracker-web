const SearchDropDown = ({
  filterSearch,
  setSearchValue,
  setIsOpen,
  isOpen,
}) => {
  filterSearch.length = 3;

  const handleClickLink = () => {
    setIsOpen(false);
    setSearchValue("");
  };

  return (
    <div
      className={`${
        isOpen ? "flex" : "hidden"
      } flex-col gap-2 bg-[#F4F4F5] p-2 overflow-hidden rounded-b-lg w-[229px] duration-200`}
    >
      {filterSearch.map((record, index) => {
        return (
          <div
            key={index}
            className="flex flex-col hover:bg-gray-300 duration-200 border-b-2 border-gray-300"
          >
            {record.name}
          </div>
        );
      })}
    </div>
  );
};

export default SearchDropDown;



