import { useEffect, useState } from "react";
import SearchDropDown from "./SearchDropDown";
import { BACKEND_ENDPOINT } from "@/constant/constant";

const Search = () => {
  const [searchValue, setSearchValue] = useState("");
  const [recordsForSearch, setRecordsForSearch] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/records`);
      if (!response.ok)
        throw new Error(`HTTP error! Status: ${response.status}`);
      const data = await response.json();
      setRecordsForSearch(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  const handleInputChange = (event) => {
    setIsOpen(true);
    setSearchValue(event.target.value);
  };

  const filterSearch = recordsForSearch.filter((record) =>
    record.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <label className="input input-bordered flex items-center gap-2 relative">
      <input
        type="text"
        onChange={handleInputChange}
        value={searchValue}
        className="grow"
        placeholder="Search"
      />
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
      <div className="absolute top-6">
        <SearchDropDown
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          setSearchValue={setSearchValue}
          filterSearch={filterSearch}
        />
      </div>
    </label>
  );
};
export default Search;
