import { flexRender, Row } from "@tanstack/react-table";
import { TableBody, TableCell, TableRow } from "../ui/table";
import { useTable } from "./DataTableLayout";
import { cn } from "@/lib/utils";
import { Fragment } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useDirection } from "./DirectionProvider";

interface DataTableBodyProps<TData> {
  onRowClick?: (row: Row<TData>) => void;
  renderSubRow?: (row: Row<TData>) => React.ReactNode;
  selectedId?: string;
}

export default function DataTableBody<TData>({
  onRowClick,
  renderSubRow,
  selectedId,
}: DataTableBodyProps<TData>) {
  const table = useTable<TData>();
  const direction = useDirection();
  const isRTL = direction === "rtl";
  const getRowClasses = (row: Row<TData>, isExpanded: boolean) => ({
    // Base classes
    "relative border-b outline-none": true,
    "cursor-pointer": !!onRowClick || !!renderSubRow,
    "transition-all duration-200 ease-in-out": true,

    // Combined hover and expanded states
    ...(!isExpanded
      ? {
          "hover:bg-muted/15": !!renderSubRow && !onRowClick,
          "hover:bg-primary/5": !!onRowClick && !renderSubRow,
          "hover:bg-muted/25": !!onRowClick && !!renderSubRow,
        }
      : {
          "bg-muted/20 hover:bg-muted/30": true,
        }),

    // Active and selected states
    "bg-primary/5": selectedId === row.id,
    "active:bg-primary/10": !!onRowClick && !isExpanded,
    "active:scale-[0.997]": !!onRowClick && !isExpanded,

    // Focus states
    "group focus:outline-none": true,
    "focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1":
      true,
  });

  const getChevronClasses = (isExpanded: boolean) => ({
    // Base positioning and size
    "absolute top-1/2 -translate-y-1/2 h-4 w-4": true,
    [isRTL ? "left-3" : "right-3"]: true,

    // Enhanced transitions with transform
    "transition-all duration-200 ease-in-out transform": true,

    // RTL-aware rotation
    [isExpanded ? (isRTL ? "-rotate-90" : "rotate-90") : "rotate-0"]: true,

    // Enhanced colors with opacity transitions
    "text-muted-foreground/50": !isExpanded,
    "text-primary/70": isExpanded,

    // Improved hover effects
    "group-hover:text-foreground/80": true,

    // Direction and state aware transforms
    ...(!isExpanded
      ? {
          [`group-hover:${isRTL ? "-translate-x-0.5" : "translate-x-0.5"}`]:
            true,
          "group-hover:scale-110": true,
        }
      : {
          "scale-105": true,
        }),
  });

  const getSubRowClasses = () =>
    cn(
      // Base animation classes
      "animate-in duration-200 ease-out",

      // RTL-aware slide animations
      isRTL ? "slide-in-from-left-2" : "slide-in-from-right-2",

      // Exit animations
      "data-[state=closed]:animate-out",
      isRTL
        ? "data-[state=closed]:slide-out-to-left-2"
        : "data-[state=closed]:slide-out-to-right-2",
      "data-[state=closed]:fade-out",
      "data-[state=closed]:duration-200",

      // Transition smoothing
      "transition-all",
      "overflow-hidden"
    );

  return (
    <TableBody dir={direction}>
      {table.getRowModel().rows?.length ? (
        table.getRowModel().rows.map((row) => (
          <Fragment key={row.id}>
            <TableRow
              className={cn("group", getRowClasses(row, row.getIsExpanded()))}
              data-state={row.getIsExpanded() ? "expanded" : "collapsed"}
              aria-expanded={row.getIsExpanded()}
              role={onRowClick || renderSubRow ? "button" : "row"}
              tabIndex={onRowClick || renderSubRow ? 0 : undefined}
              onClick={() => {
                if (onRowClick) {
                  onRowClick(row);
                } else if (renderSubRow) {
                  row.toggleExpanded();
                }
              }}
            >
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
              {renderSubRow && (
                <div
                  className={cn(
                    "absolute top-1/2 -translate-y-1/2",
                    isRTL ? "left-3" : "right-3"
                  )}
                  aria-hidden="true"
                >
                  {isRTL ? (
                    <ChevronLeft
                      className={cn(getChevronClasses(row.getIsExpanded()))}
                    />
                  ) : (
                    <ChevronRight
                      className={cn(getChevronClasses(row.getIsExpanded()))}
                    />
                  )}
                </div>
              )}
            </TableRow>
            {row.getIsExpanded() && renderSubRow && (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={row.getVisibleCells().length + 1}
                  className={cn(
                    "p-0 overflow-hidden border-b",
                    getSubRowClasses()
                  )}
                >
                  <div className="py-4 px-4 bg-muted/5">
                    {renderSubRow(row)}
                  </div>
                </TableCell>
              </TableRow>
            )}
          </Fragment>
        ))
      ) : (
        <TableRow>
          <TableCell
            colSpan={table.getAllColumns().length}
            className="h-24 text-center text-muted-foreground"
          >
            אין נתונים להצגה
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );
}
