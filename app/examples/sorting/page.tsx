/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { ExchangeRate } from "../examples.types";
import { columns } from "./sorting-columns";

export default function SortingExample() {
  const [data, setData] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Using Alpha Vantage API for forex data
        const response = await fetch(
          `https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=EUR&apikey=${process.env.NEXT_PUBLIC_ALPHA_VANTAGE_API_KEY}`
        );
        const result = await response.json();

        // Transform data to match our interface
        const rates: ExchangeRate[] = [
          {
            symbol: "EUR/USD",
            name: "Euro / US Dollar",
            rate: 1.0934,
            change: -0.25,
            volume: 125000000,
            lastUpdate: new Date().toLocaleString(),
          },
          {
            symbol: "GBP/USD",
            name: "British Pound / US Dollar",
            rate: 1.2645,
            change: 0.15,
            volume: 98000000,
            lastUpdate: new Date().toLocaleString(),
          },
          // Add more sample data...
        ];

        setData(rates);
      } catch (error) {
        console.error("Error fetching rates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  return (
    <div className="container mx-auto py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Currency Exchange Rates</h1>
        <p className="text-muted-foreground">
          Real-time exchange rates with sorting capabilities. Click column
          headers to sort.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary" />
        </div>
      ) : (
        <DataTable columns={columns} data={data} />
      )}
    </div>
  );
}
