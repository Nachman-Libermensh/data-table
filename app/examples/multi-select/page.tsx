"use client";

import { DataTable } from "@/components/data-table";
import { Product } from "../examples.types";
import { columns } from "./multi-selection-columns";
import { useEffect, useState } from "react";

export default function MultiSelectExample() {
  const [data, setData] = useState<Product[]>([]);
  useEffect(() => {
    const products: Product[] = Array.from({ length: 100 }, (_, i) => ({
      id: `PROD-${i + 1}`,
      name: `Product ${i + 1}`,
      category: ["Electronics", "Clothing", "Food", "Books"][
        Math.floor(Math.random() * 4)
      ],
      price: Math.floor(Math.random() * 1000) + 1,
      stock: Math.floor(Math.random() * 100),
      status: ["in-stock", "low-stock", "out-of-stock"][
        Math.floor(Math.random() * 3)
      ] as Product["status"],
    }));
    setData(products);
  }, []);
  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Product Management</h1>
        <p className="text-muted-foreground">
          Manage your products with bulk actions and filtering capabilities.
        </p>
      </div>

      <DataTable
        columns={columns}
        data={data}
        toolbar={{
          controls: [
            {
              type: "search",
              column: "name",
              placeholder: "Search products...",
            },
            {
              type: "filter",
              column: "category",
              placeholder: "Filter by category",
              dynamic: true,
            },
            {
              type: "filter",
              column: "status",
              placeholder: "Filter by status",
              options: [
                { label: "In Stock", value: "in-stock" },
                { label: "Low Stock", value: "low-stock" },
                { label: "Out of Stock", value: "out-of-stock" },
              ],
            },
          ],
        }}
      />
    </div>
  );
}
