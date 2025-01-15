import { flexRender, Row } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { useTable } from "./DataTableLayout";
import { cn } from "@/lib/utils";
import { Fragment } from "react";

interface DataTableBodyProps<TData> {
  onRowClick?: (row: Row<TData>) => void;
  renderSubRow?: (row: Row<TData>) => React.ReactNode;
  selectedId?: string;
}

export default function DataTableBody<TData>({
  onRowClick,
  renderSubRow,
}: DataTableBodyProps<TData>) {
  const table = useTable<TData>();

  return (
    <TableBody>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <TableRow
              onClick={(e) => {
                e.stopPropagation();
                row.toggleExpanded();
              }}
              className={cn(
                "cursor-pointer transition-colors hover:bg-slate-50"
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} onClick={() => onRowClick?.(row)}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
            {row.getIsExpanded() && renderSubRow && (
              <TableRow className="hover:bg-inherit">
                <TableCell
                  className="p-0"
                  colSpan={row.getVisibleCells().length + 1}
                >
                  {renderSubRow(row)}
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center"
          >
            אין נתונים להצגה
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
