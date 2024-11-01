"use client";

import Header from "@/components/dashboard-components/header/Header";
import RecordsHero from "@/components/record/RecordsHero";
import RecordsMenu from "@/components/record/RecordsMenu";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useEffect, useState } from "react";

const RecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [filter, setFilter] = useState("all");
  const [filterCate, setFilterCate] = useState(records);

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

  const filterCategory = records.filter(
    (record) => filterCate[record.category_id]
  );

  const filteredRecords = records.filter((record) => {
    if (filter === "all") return true;
    if (filter === "INC") return record.transaction_type === "INC";
    if (filter === "EXP") return record.transaction_type === "EXP";
    return false;
  });

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full bg-gray-100 h-screen">
        <div className="container m-auto max-w-[1260px] pt-[80px] flex gap-8">
          <RecordsMenu
            setFilter={setFilter}
            filterCate={filterCate}
            setFilterCate={setFilterCate}
          />
          <RecordsHero
            filteredRecords={filteredRecords}
            filterCategory={filterCategory}
          />
        </div>
      </div>
    </div>
  );
};
export default RecordsPage;
