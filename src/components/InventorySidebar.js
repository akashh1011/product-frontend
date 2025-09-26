"use client";
import React, { useEffect, useState } from "react";

export default function InventorySidebar({ product, onClose }) {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!product) return;
    setLoading(true);
    fetch(`/api/inventory/${product._id}/history`)
      .then(r => r.json())
      .then(d => {
        if (d && d.data) setLogs(d.data);
        else setLogs([]);
      })
      .catch(err => {
        console.error(err);
        setLogs([]);
      })
      .finally(() => setLoading(false));
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-lg p-4 z-50">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold">Inventory History</h3>
          <div className="text-sm text-gray-500">{product.name}</div>
        </div>
        <div>
          <button onClick={onClose} className="text-gray-500 px-2 py-1">Close</button>
        </div>
      </div>

      <div className="mt-4 overflow-auto max-h-[80vh]">
        {loading && <div className="text-sm text-gray-500">Loading...</div>}
        {!loading && logs.length === 0 && <div className="text-sm text-gray-500">No history available</div>}
        <ul className="space-y-3">
          {logs.map(log => (
            <li key={log._id} className="border rounded p-3">
              <div className="text-sm">
                <strong>{log.changedBy || "Unknown"}</strong> changed quantity
              </div>
              <div className="text-xs text-gray-600">
                {log.oldQuantity} → {log.newQuantity}
              </div>
              <div className="text-xs text-gray-500 mt-1">{new Date(log.changedAt).toLocaleString()}</div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
