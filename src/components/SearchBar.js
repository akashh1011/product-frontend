"use client";
import React from "react";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="flex items-center w-[420px] bg-gray-100 rounded px-3 py-2">
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent outline-none w-full text-sm"
      />
      <button
        onClick={() => {
          // optional: trigger search — parent already filters by query
        }}
        className="text-sm text-gray-600"
      >
        Search
      </button>
    </div>
  );
}
