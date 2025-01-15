import { ColumnDef } from "@tanstack/react-table";
import { Character } from "../examples.types";

export const columns: ColumnDef<Character>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "species",
    header: "Species",
    filterFn: "equals",
  },
  {
    accessorKey: "gender",
    header: "Gender",
    filterFn: "equals",
  },
  {
    accessorKey: "birth_year",
    header: "Birth Year",
  },
  {
    accessorKey: "height",
    header: "Height",
    cell: ({ row }) => `${row.getValue("height")}cm`,
  },
];
