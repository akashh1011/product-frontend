"use client";
import { useRouter } from "next/navigation";
import ProductAddForm from "../../../components/ProductForm";

export default function NewProductPage() {
  const router = useRouter();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={() => router.back()}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold mb-4">Add New Product</h2>
        <ProductAddForm
          onCreated={() => {
            router.push("/"); // go back home after adding
          }}
        />
      </div>
    </div>
  );
}
