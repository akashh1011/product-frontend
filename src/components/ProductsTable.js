"use client";
import React, { useState } from "react";
import ProductRow from "./ProductRow";

export default function ProductsTable({ products = [], onProductsUpdated, onOpenHistory }) {
  const [items, setItems] = useState(products);

  // sync when products prop changes
  React.useEffect(() => {
    setItems(products);
  }, [products]);

  function handleUpdateLocal(updated) {
    setItems((prev) => prev.map(p => p._id === updated._id ? updated : p));
    onProductsUpdated && onProductsUpdated();
  }

  function handleDeleteLocal(id) {
    setItems((prev) => prev.filter(p => p._id !== id));
    onProductsUpdated && onProductsUpdated();
  }

  return (
    <div className="bg-white shadow rounded">
      <table className="w-full text-left">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3">Image</th>
            <th className="p-3">Name</th>
            <th className="p-3">Unit</th>
            <th className="p-3">Category</th>
            <th className="p-3">Brand</th>
            <th className="p-3">Stock</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan="8" className="p-6 text-center text-sm text-gray-500">No products found</td>
            </tr>
          )}
          {items.map((product) => (
            <ProductRow
              key={product._id}
              product={product}
              onSave={handleUpdateLocal}
              onDelete={handleDeleteLocal}
              onOpenHistory={() => onOpenHistory && onOpenHistory(product)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}
