// simple API helpers

const BASE_URL = "https://product-backend-dovx.onrender.com"; // "http://localhost:5000";
const API_BASE = "api";

export async function fetchProducts() {
  const res = await fetch(`${BASE_URL}/${API_BASE}/products`);
  if (!res.ok) {
    try {
      return await res.json();
    } catch (e) {
      return { status: res.status, data: [] };
    }
  }
  return res.json();
}

export async function addProduct(payload) {
  const res = await fetch(`${BASE_URL}/${API_BASE}/products`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const json = await res.json().catch(() => ({ status: res.status }));
  return json;
}

export async function importProducts(formData) {
  const res = await fetch(`${BASE_URL}/${API_BASE}/products/import`, {
    method: "POST",
    body: formData,
  });
  const json = await res.json().catch(() => ({ status: res.status }));
  return json;
}

export async function updateProduct(id, payload) {
  const res = await fetch(`${BASE_URL}/${API_BASE}/products/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => null);
  return json;
}


export async function exportProducts() {
  // simple approach: navigate to export endpoint to download
  window.open(`${BASE_URL}/${API_BASE}/products/export`, "_blank");
}