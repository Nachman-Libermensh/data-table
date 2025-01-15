import { ColumnDef } from "@tanstack/react-table";
import { User } from "../examples.types";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "company.name",
    header: "Company",
  },
];
