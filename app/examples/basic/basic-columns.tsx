import { ColumnDef } from "@tanstack/react-table";

type Pokemon = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { type: { name: string } }[];
};

export const columns: ColumnDef<Pokemon>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "types",
    header: "Type",
    cell: ({ row }) => {
      const types = row.getValue("types") as { type: { name: string } }[];
      return (
        <div className="flex gap-2">
          {types.map((type) => (
            <span
              key={type.type.name}
              className="capitalize bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md text-sm"
            >
              {type.type.name}
            </span>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "height",
    header: "Height",
    cell: ({ row }) => `${(row.getValue("height") as number) / 10}m`,
  },
  {
    accessorKey: "weight",
    header: "Weight",
    cell: ({ row }) => `${(row.getValue("weight") as number) / 10}kg`,
  },
  {
    accessorKey: "base_experience",
    header: "Base XP",
  },
];
