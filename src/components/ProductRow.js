"use client";
import React, { useState } from "react";
import { updateProduct } from "../lib/api";

export default function ProductRow({ product, onSave, onDelete, onOpenHistory }) {
  const [isEditing, setIsEditing] = useState(false);
  const [local, setLocal] = useState({
    name: product.name || "",
    unit: product.unit || "",
    category: product.category || "",
    brand: product.brand || "",
    stock: product.stock ?? 0,
    status: product.status || "",
    image: product.image || ""
  });
  const [saving, setSaving] = useState(false);

  function colorForStatus(status) {
    if (!status) return "bg-gray-100 text-gray-800";
    const s = status.toLowerCase();
    if (s.includes("out")) return "bg-red-100 text-red-700";
    if (s.includes("in")) return "bg-green-100 text-green-700";
    return "bg-gray-100 text-gray-800";
  }

  async function handleSave() {
    setSaving(true);
    try {
      const payload = {
        name: local.name,
        unit: local.unit,
        category: local.category,
        brand: local.brand,
        stock: Number(local.stock),
        status: local.status,
        image: local.image
      };
      const res = await updateProduct(product._id, payload);
      if (res && res.data) {
        onSave(res.data);
        setIsEditing(false);
      } else {
        alert("Save failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error saving product");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this product?")) return;
    try {
      const resp = await fetch(`/api/products/${product._id}`, { method: "DELETE" });
      if (resp.ok) {
        onDelete(product._id);
      } else {
        alert("Delete failed");
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  }

  return (
    <tr className="border-t">
      <td className="p-3 align-top w-28">
        <img
          src={product.image || "/placeholder.png"}
          alt={product.name}
          className="w-20 h-20 object-cover rounded"
        />
      </td>

      <td className="p-3 align-top">
        {isEditing ? (
          <input value={local.name} onChange={(e)=>setLocal({...local, name:e.target.value})} className="border rounded px-2 py-1 w-64"/>
        ) : (
          <div className="font-medium">{product.name}</div>
        )}
      </td>

      <td className="p-3 align-top">
        {isEditing ? (
          <input value={local.unit} onChange={(e)=>setLocal({...local, unit:e.target.value})} className="border rounded px-2 py-1 w-24"/>
        ) : (
          <div>{product.unit}</div>
        )}
      </td>

      <td className="p-3 align-top">
        {isEditing ? (
          <input value={local.category} onChange={(e)=>setLocal({...local, category:e.target.value})} className="border rounded px-2 py-1 w-36"/>
        ) : (
          <div>{product.category}</div>
        )}
      </td>

      <td className="p-3 align-top">
        {isEditing ? (
          <input value={local.brand} onChange={(e)=>setLocal({...local, brand:e.target.value})} className="border rounded px-2 py-1 w-36"/>
        ) : (
          <div>{product.brand}</div>
        )}
      </td>

      <td className="p-3 align-top">
        {isEditing ? (
          <input type="number" value={local.stock} onChange={(e)=>setLocal({...local, stock: e.target.value})} className="border rounded px-2 py-1 w-24"/>
        ) : (
          <div>{product.stock}</div>
        )}
      </td>

      <td className="p-3 align-top">
        {isEditing ? (
          <input value={local.status} onChange={(e)=>setLocal({...local, status:e.target.value})} className="border rounded px-2 py-1 w-36"/>
        ) : (
          <span className={`inline-block px-2 py-1 text-sm rounded ${colorForStatus(product.status)}`}>
            {product.status}
          </span>
        )}
      </td>

      <td className="p-3 align-top text-right space-x-2">
        {isEditing ? (
          <>
            <button onClick={handleSave} disabled={saving} className="px-3 py-1 bg-blue-600 text-white rounded text-sm">
              {saving ? "Saving..." : "Save"}
            </button>
            <button onClick={() => { setIsEditing(false); setLocal({...product}); }} className="px-3 py-1 bg-gray-100 rounded text-sm">
              Cancel
            </button>
          </>
        ) : (
          <>
            <button onClick={() => setIsEditing(true)} className="px-3 py-1 bg-yellow-400 text-white rounded text-sm">Edit</button>
            <button onClick={handleDelete} className="px-3 py-1 bg-red-500 text-white rounded text-sm">Delete</button>
            <button onClick={onOpenHistory} className="px-3 py-1 bg-gray-100 rounded text-sm">History</button>
          </>
        )}
      </td>
    </tr>
  );
}
