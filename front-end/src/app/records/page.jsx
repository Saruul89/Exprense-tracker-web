"use client";

import Header from "@/components/dashboard-components/header/Header";
import RecordsHero from "@/components/record/RecordsHero";
import RecordsMenu from "@/components/record/RecordsMenu";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useEffect, useState } from "react";

const RecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [tranType, setTranType] = useState("all");
  const [cateType, setCateType] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    try {
      let url;
      if (tranType !== "all" && cateType !== "all") {
        url = `${BACKEND_ENDPOINT}/records/${tranType}/${cateType}`;
      } else if (tranType !== "all") {
        url = `${BACKEND_ENDPOINT}/records/${tranType}`;
      } else if (cateType) {
        url = `${BACKEND_ENDPOINT}/records/category/${cateType}`;
      } else {
        url = `${BACKEND_ENDPOINT}/records`;
      }

      const response = await fetch(url);
      const responseData = await response.json();
      setRecords(responseData.data);
    } catch (error) {
      console.log(error);
    }
  };

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
    fetchRecords();
    fetchCategory();
  }, []);

  return (
    <div>
      <Header />
      <div className="w-full bg-gray-100 h-screen">
        <div className="container m-auto max-w-[1260px] pt-[80px] flex gap-8">
          <RecordsMenu
            records={records}
            setTranType={setTranType}
            setCateType={setCateType}
            categories={categories}
          />
          <RecordsHero
            records={records}
            setTranType={setTranType}
            setCateType={setCateType}
            categories={categories}
          />
        </div>
      </div>
    </div>
  );
};
export default RecordsPage;
