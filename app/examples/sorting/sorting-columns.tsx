import { ColumnDef } from "@tanstack/react-table";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ExchangeRate } from "../examples.types";
import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";

export const columns: ColumnDef<ExchangeRate>[] = [
  {
    accessorKey: "symbol",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Symbol" />
    ),
    cell: ({ row }) => {
      const symbol = row.getValue("symbol") as string;
      const [base] = symbol.split("/");
      return (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/10 via-primary/5 to-transparent flex items-center justify-center font-semibold text-sm shadow-sm">
            {base}
          </div>
          <div>
            <div className="font-medium">{symbol}</div>
            <div className="text-xs text-muted-foreground/80">
              {row.original.name}
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "rate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Rate" />
    ),
    cell: ({ row }) => {
      const rate = row.getValue("rate") as number;
      return <div className="font-mono tabular-nums">${rate.toFixed(4)}</div>;
    },
  },
  {
    accessorKey: "change",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="24h Change" />
    ),
    sortDescFirst: true, // Add default descending sort
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Volume" />
    ),
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
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Last Update" />
    ),
  },
];
