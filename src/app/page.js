"use client";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductsTable from "../components/ProductsTable";
import InventorySidebar from "../components/InventorySidebar";
import { fetchProducts } from "../lib/api";

export default function Page() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [query, setQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);
  const [selectedProductForHistory, setSelectedProductForHistory] = useState(null);

  async function loadProducts() {
    try {
      const res = await fetchProducts();
      if (res && res.data) {
        setProducts(res.data);
        // derive categories
        const cats = Array.from(new Set(res.data.map(p => p.category).filter(Boolean)));
        setCategories(cats);
      } else {
        setProducts([]);
      }
    } catch (err) {
      console.error("Failed to load products", err);
    }
  }

  useEffect(() => {
    loadProducts();
    // refresh when key changes (used after import/export/updates)
  }, [refreshKey]);

  // filtered view local
  const filtered = products.filter(p => {
    const matchesQuery = query.trim() === "" || (p.name || "").toLowerCase().includes(query.trim().toLowerCase());
    const matchesCategory = !selectedCategory || selectedCategory === "" || p.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <main className="p-6">
      <Header
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
        query={query}
        onQueryChange={setQuery}
        onRefresh={() => setRefreshKey(k => k + 1)}
      />
      <div className="mt-6">
        <ProductsTable
          products={filtered}
          onProductsUpdated={() => setRefreshKey(k => k + 1)}
          onOpenHistory={(product) => setSelectedProductForHistory(product)}
        />
      </div>

      <InventorySidebar
        product={selectedProductForHistory}
        onClose={() => setSelectedProductForHistory(null)}
      />
    </main>
  );
}
