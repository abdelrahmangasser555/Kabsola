"use client";
import React from "react";
import { SearchBar } from "@/features/searchDrug/components/searchBar";
export default function DrugSearch() {
  return (
    <div className="flex flex-col min-h-screen">
      <SearchBar />
    </div>
  );
}
