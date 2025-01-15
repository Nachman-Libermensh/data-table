import { flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";

import { useTable } from "./DataTableLayout";
import { useDirection } from "./DirectionProvider";
import { cn } from "@/lib/utils";

function DataTableHeader() {
  const { getHeaderGroups } = useTable();
  const dir = useDirection();

  return (
    <TableHeader>
      {getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className={cn(
                dir === "rtl" ? "text-right" : "text-left",
                "transition-colors hover:bg-muted/50"
              )}
            >
              {header.isPlaceholder
                ? null
                : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
export default DataTableHeader;
