"use client";

import Header from "@/components/dashboard-components/tolgoi/Header";
import RecordsHero from "@/components/record/RecordsHero";
import RecordsMenu from "@/components/record/RecordsMenu";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useEffect, useState } from "react";

const RecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [tranType, setTranType] = useState("all");
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [error, setError] = useState(null);
  const [filteredRecord, setFilteredRecord] = useState([]);

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
      setCategories(responseData || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Error occurred while fetching categories.");
    }
  };

  useEffect(() => {
    fetchRecords();
    fetchCategory();
  }, []);

  useEffect(() => {
    let filtered = records;

    if (selectedCategories.length > 0) {
      filtered = filtered.filter((record) =>
        selectedCategories.includes(record.category_id)
      );
    }

    if (tranType !== "all") {
      filtered = filtered.filter(
        (record) => record.transaction_type === tranType
      );
    }

    setFilteredRecord(filtered);
  }, [tranType, selectedCategories, records]);

  return (
    <div>
      <Header />
      <div className="w-full bg-gray-100 h-screen">
        <div className="container m-auto max-w-[1260px] pt-[80px] flex gap-8">
          <RecordsMenu
            setTranType={setTranType}
            categories={categories}
            tranType={tranType}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
          />
          <RecordsHero records={filteredRecord} categories={categories} />
        </div>
      </div>
    </div>
  );
};

export default RecordsPage;
