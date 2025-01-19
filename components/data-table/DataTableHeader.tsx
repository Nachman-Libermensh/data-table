import { flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";

import { useTable } from "./DataTableLayout";
import { useDirection } from "./DirectionProvider";
import { cn } from "@/lib/utils";

function DataTableHeader() {
  const { getHeaderGroups } = useTable();
  const dir = useDirection();

  return (
    <TableHeader className="bg-muted/10">
      {getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className="border-b transition-colors hover:bg-muted/5 data-[hover=true]:bg-muted/15"
        >
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              className={cn(
                "h-11 px-3",
                "text-xs font-medium text-muted-foreground/80",
                dir === "rtl" ? "text-right" : "text-left",
                "transition-colors first:rounded-tr-md last:rounded-tl-md",
                "group/header"
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
