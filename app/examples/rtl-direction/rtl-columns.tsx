import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table/DataTableColumnHeader";
import { ElectionRecord } from "../examples.types";

const calculatePercentage = (value: number, total: number) =>
  ((value / total) * 100).toFixed(1) + "%";

export const columns: ColumnDef<ElectionRecord>[] = [
  {
    accessorKey: "שם ישוב",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="יישוב" />
    ),
    sortingFn: "text",
  },
  {
    accessorKey: "בזב",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="זכאים להצבעה" />
    ),
    cell: ({ getValue }) => (getValue() as number).toLocaleString("he-IL"),
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "מצביעים",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="מצביעים" />
    ),
    cell: ({ row }) => {
      const voters = row.getValue("מצביעים") as number;
      const total = row.getValue("בזב") as number;
      return `${voters.toLocaleString("he-IL")} (${calculatePercentage(
        voters,
        total
      )})`;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "כשרים",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="קולות כשרים" />
    ),
    cell: ({ row }) => {
      const valid = row.getValue("כשרים") as number;
      const voters = row.getValue("מצביעים") as number;
      return `${valid.toLocaleString("he-IL")} (${calculatePercentage(
        valid,
        voters
      )})`;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "מחל",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="הליכוד" />
    ),
    cell: ({ row }) => {
      const votes = row.getValue("מחל") as number;
      const valid = row.getValue("כשרים") as number;
      return `${votes.toLocaleString("he-IL")} (${calculatePercentage(
        votes,
        valid
      )})`;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "עם",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="הציונות הדתית" />
    ),
    cell: ({ row }) => {
      const votes = row.getValue("עם") as number;
      const valid = row.getValue("כשרים") as number;
      return `${votes.toLocaleString("he-IL")} (${calculatePercentage(
        votes,
        valid
      )})`;
    },
    sortingFn: "alphanumeric",
  },
  {
    accessorKey: "שס",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ש״ס" />
    ),
    cell: ({ row }) => {
      const votes = row.getValue("שס") as number;
      const valid = row.getValue("כשרים") as number;
      return `${votes.toLocaleString("he-IL")} (${calculatePercentage(
        votes,
        valid
      )})`;
    },
    sortingFn: "alphanumeric",
  },
];
