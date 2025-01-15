import { ColumnDef } from "@tanstack/react-table";

import { ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ExchangeRate } from "../examples.types";

export const columns: ColumnDef<ExchangeRate>[] = [
  {
    accessorKey: "symbol",
    header: "Symbol",
    cell: ({ row }) => {
      const symbol = row.getValue("symbol") as string;
      return (
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
            {symbol.slice(0, 2)}
          </div>
          <span className="font-medium">{symbol}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "rate",
    header: "Rate",
    cell: ({ row }) => {
      const rate = row.getValue("rate") as number;
      return <div className="font-mono">{rate.toFixed(4)}</div>;
    },
  },
  {
    accessorKey: "change",
    header: "24h Change",
    cell: ({ row }) => {
      const change = row.getValue("change") as number;
      const isPositive = change > 0;
      return (
        <div className="flex items-center gap-1">
          {isPositive ? (
            <Badge
              variant="default"
              className="gap-1 bg-green-500 hover:bg-green-600"
            >
              <ArrowUp className="w-3 h-3" />
              {change.toFixed(2)}%
            </Badge>
          ) : (
            <Badge variant="destructive" className="gap-1">
              <ArrowDown className="w-3 h-3" />
              {Math.abs(change).toFixed(2)}%
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "volume",
    header: "Volume",
    cell: ({ row }) => {
      const volume = row.getValue("volume") as number;
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        notation: "compact",
      }).format(volume);
    },
  },
  {
    accessorKey: "lastUpdate",
    header: "Last Update",
  },
];
