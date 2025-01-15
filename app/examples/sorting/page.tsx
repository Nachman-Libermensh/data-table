"use client";

import { useState, useEffect } from "react";
import { DataTable } from "@/components/data-table";
import { columns } from "./sorting-columns";

import { Coins, TrendingUp, TrendingDown, Database } from "lucide-react";
import type { ExchangeRate } from "../examples.types";
import { StateCard } from "./StateCard";
import { toolbarConfig } from "./sorting-toolbar";

const CURRENCY_PAIRS = [
  { symbol: "EUR/USD", baseRate: 1.0934 },
  { symbol: "GBP/USD", baseRate: 1.2645 },
  { symbol: "JPY/USD", baseRate: 0.00675 },
  { symbol: "AUD/USD", baseRate: 0.6578 },
  { symbol: "CAD/USD", baseRate: 0.7434 },
  { symbol: "CHF/USD", baseRate: 1.1523 },
  { symbol: "NZD/USD", baseRate: 0.6123 },
  { symbol: "CNY/USD", baseRate: 0.1387 },
  { symbol: "HKD/USD", baseRate: 0.1279 },
  { symbol: "SGD/USD", baseRate: 0.7456 },
  { symbol: "INR/USD", baseRate: 0.0121 },
  { symbol: "MXN/USD", baseRate: 0.0587 },
];

export default function SortingExample() {
  const [data, setData] = useState<ExchangeRate[]>([]);
  const [loading, setLoading] = useState(true);

  const getTradingMetrics = (rates: ExchangeRate[]) => {
    const totalVolume = rates.reduce((sum, rate) => sum + rate.volume, 0);
    const highestGainer = rates.reduce(
      (max, rate) => (rate.change > max.change ? rate : max),
      rates[0]
    );
    const biggestDrop = rates.reduce(
      (min, rate) => (rate.change < min.change ? rate : min),
      rates[0]
    );

    return {
      totalVolume,
      highestGainer,
      biggestDrop,
      activePairs: rates.length,
    };
  };

  useEffect(() => {
    const generateMockData = () => {
      const rates: ExchangeRate[] = CURRENCY_PAIRS.map((pair) => {
        const fluctuation = (Math.random() - 0.5) * 0.01;
        const currentRate = pair.baseRate * (1 + fluctuation);
        const change = (fluctuation * 100).toFixed(2);
        const volume = Math.floor(Math.random() * 1000000000) + 500000000;

        return {
          symbol: pair.symbol,
          name: getCurrencyName(pair.symbol),
          rate: currentRate,
          change: parseFloat(change),
          volume,
          lastUpdate: new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        };
      });

      setData(rates.sort((a, b) => Math.abs(b.change) - Math.abs(a.change)));
      setLoading(false);
    };

    generateMockData();
    const interval = setInterval(generateMockData, 5000);
    return () => clearInterval(interval);
  }, []);

  const metrics = data.length ? getTradingMetrics(data) : null;

  function getCurrencyName(symbol: string): string {
    const currencyNames: Record<string, string> = {
      EUR: "Euro",
      GBP: "British Pound",
      JPY: "Japanese Yen",
      AUD: "Australian Dollar",
      CAD: "Canadian Dollar",
      CHF: "Swiss Franc",
      NZD: "New Zealand Dollar",
      CNY: "Chinese Yuan",
      HKD: "Hong Kong Dollar",
      SGD: "Singapore Dollar",
      INR: "Indian Rupee",
      MXN: "Mexican Peso",
      USD: "US Dollar",
    };

    const [base] = symbol.split("/");
    return `${currencyNames[base] || base} / US Dollar`;
  }

  return (
    <div className="container mx-auto py-10 space-y-8">
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Currency Exchange
          </h1>
          <p className="text-muted-foreground text-lg">
            Simulated exchange rates with real-time updates
            <span className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 px-3 py-1 rounded-full text-sm font-medium ml-3">
              Demo Data
            </span>
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StateCard
            title="Total Trading Volume"
            value={
              metrics
                ? new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                    notation: "compact",
                    maximumFractionDigits: 1,
                  }).format(metrics.totalVolume)
                : "0"
            }
            icon={<Coins className="h-4 w-4 text-muted-foreground" />}
            loading={loading}
          />
          <StateCard
            title="Highest Gainer"
            value={
              metrics
                ? `${
                    metrics.highestGainer.symbol
                  } (${metrics.highestGainer.change.toFixed(2)}%)`
                : "---"
            }
            icon={<TrendingUp className="h-4 w-4 text-green-500" />}
            trend="up"
            loading={loading}
          />
          <StateCard
            title="Biggest Drop"
            value={
              metrics
                ? `${
                    metrics.biggestDrop.symbol
                  } (${metrics.biggestDrop.change.toFixed(2)}%)`
                : "---"
            }
            icon={<TrendingDown className="h-4 w-4 text-red-500" />}
            trend="down"
            loading={loading}
          />
          <StateCard
            title="Active Pairs"
            value={metrics ? metrics.activePairs.toString() : "0"}
            icon={<Database className="h-4 w-4 text-muted-foreground" />}
            loading={loading}
          />
        </div>

        <div className="rounded-lg border bg-card">
          {loading ? (
            <div className="flex items-center justify-center h-[400px]">
              <div className="flex flex-col items-center gap-2">
                <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
                <span className="text-sm text-muted-foreground">
                  Loading data...
                </span>
              </div>
            </div>
          ) : (
            <DataTable columns={columns} data={data} toolbar={toolbarConfig} />
          )}
        </div>
      </div>
    </div>
  );
}
