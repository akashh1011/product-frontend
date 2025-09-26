"use client";
import React, { useState } from "react";
import { addProduct } from "../lib/api"; // adjust path if api.js lives elsewhere

export default function ProductAddForm({ onCreated }) {
  const [form, setForm] = useState({
    name: "",
    unit: "",
    category: "",
    brand: "",
    stock: 0,
    status: "active",
    image: ""
  });
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    try {
      const result = await addProduct(form);

      if (result && (result.success || result.id || result._id)) {
        alert("✅ Product added successfully!");
        onCreated && onCreated(result);
      } else {
        alert(result?.message || "❌ Failed to add product");
      }
    } catch (err) {
      console.error(err);
      alert("⚠️ Error creating product");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          className="mt-1 w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Unit</label>
        <input
          type="text"
          value={form.unit}
          onChange={(e) => setForm({ ...form, unit: e.target.value })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Category</label>
        <input
          type="text"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Brand</label>
        <input
          type="text"
          value={form.brand}
          onChange={(e) => setForm({ ...form, brand: e.target.value })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Stock</label>
        <input
          type="number"
          value={form.stock}
          onChange={(e) => setForm({ ...form, stock: Number(e.target.value) })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Status</label>
        <select
          value={form.status}
          onChange={(e) => setForm({ ...form, status: e.target.value })}
          className="mt-1 w-full border rounded px-3 py-2"
        >
          <option>active</option>
          <option>inactive</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Image URL</label>
        <input
          type="text"
          value={form.image}
          onChange={(e) => setForm({ ...form, image: e.target.value })}
          className="mt-1 w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={saving}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
      >
        {saving ? "Saving..." : "Add Product"}
      </button>
    </form>
  );
}
