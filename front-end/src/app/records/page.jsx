"use client";

import Header from "@/components/dashboard-components/header/Header";
import RecordsHero from "@/components/record/RecordsHero";
import RecordsMenu from "@/components/record/RecordsMenu";
import { BACKEND_ENDPOINT } from "@/constant/constant";
import { useEffect, useState } from "react";

const RecordsPage = () => {
  const [records, setRecords] = useState([]);
  const [tranType, setTranType] = useState("all");
  const [cateType, setCateType] = useState("all");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  const fetchRecords = async () => {
    try {
      // `cateType`が配列でなければ空配列に変換
      const categories = Array.isArray(cateType) ? cateType : [];

      let url = `${BACKEND_ENDPOINT}/records?category=${JSON.stringify(
        categories
      )}&type=${tranType}`;
      console.log(url);

      const response = await fetch(url);
      const responseData = await response.json();

      if (responseData.success) {
        setRecords(responseData.data);
      } else {
        console.error("Error fetching records:", responseData.error);
      }
    } catch (error) {
      console.error("Error:", error);
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
  }, [tranType, cateType]);

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
            tranType={tranType}
            setRecords={setRecords}
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
