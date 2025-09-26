"use client";
import React, { useRef, useState } from "react";
import { exportProducts, importProducts } from "../lib/api";

export default function ImportExport({ onDone }) {
  const fileRef = useRef();
  const [loading, setLoading] = useState(false);

  async function handleImport(e) {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await importProducts(fd);
      // inform user minimally
      if (res && res.status >= 200 && res.status < 300) {
        alert("Import successful");
        onDone && onDone();
      } else {
        alert("Import failed");
      }
    } catch (err) {
      console.error(err);
      alert("Import error");
    } finally {
      setLoading(false);
      e.target.value = "";
    }
  }

  function handleExport() {
    exportProducts();
  }

  return (
    <div className="flex items-center gap-2">
      <label className="flex items-center gap-2">
        <input
          ref={fileRef}
          type="file"
          accept=".csv,text/csv"
          onChange={handleImport}
          className="hidden"
        />
        <button
          onClick={() => fileRef.current && fileRef.current.click()}
          className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Importing..." : "Import"}
        </button>
      </label>

      <button
        onClick={handleExport}
        className="px-3 py-2 bg-gray-100 border rounded hover:bg-gray-200"
      >
        Export
      </button>
    </div>
  );
}
