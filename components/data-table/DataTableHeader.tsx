import { flexRender } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";

import { useTable } from "./DataTableLayout";

function DataTableHeader() {
  const { getHeaderGroups } = useTable();

  return (
    <TableHeader>
      {getHeaderGroups().map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {headerGroup.headers.map((header) => {
            return (
              <TableHead
                className="text-right"
                key={header.id}
                colSpan={header.colSpan}
              >
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            );
          })}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export default DataTableHeader;
