"use client";
import React from "react";
import SearchBar from "./SearchBar";
import CategoryFilter from "./CategoryFilter";
import ImportExport from "./ImportExport";

export default function Header({ categories = [], selectedCategory, onCategoryChange, query, onQueryChange, onRefresh }) {
  return (
    <header className="bg-white shadow-sm rounded p-4 flex items-center gap-4">
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3">
          <h1 className="text-xl font-semibold">Products</h1>
          <span className="text-sm text-gray-500">Manage inventory and products</span>
        </div>
        <div className="mt-3 flex gap-3">
          <SearchBar value={query} onChange={onQueryChange} />
          <CategoryFilter categories={categories} value={selectedCategory} onChange={onCategoryChange} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={() => {
            window.location.href = "/products/new";
          }}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Add New Product
        </button>

        <ImportExport onDone={onRefresh} />
      </div>
    </header>
  );
}
