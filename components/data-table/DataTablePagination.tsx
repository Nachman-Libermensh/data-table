import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
// import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTable } from "./DataTableLayout";
import { useDirection } from "./DirectionProvider";

function DataTablePagination() {
  const table = useTable();
  const dir = useDirection();
  const isRTL = dir === "rtl";

  // Icons based on direction
  const FirstIcon = isRTL ? ChevronLast : ChevronFirst;
  const PrevIcon = isRTL ? ChevronRight : ChevronLeft;
  const NextIcon = isRTL ? ChevronLeft : ChevronRight;
  const LastIcon = isRTL ? ChevronFirst : ChevronLast;

  return (
    <div className="px-2 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Page Size Controls */}
        <div className="flex items-center gap-2 rtl:space-x-reverse">
          <p className="text-sm font-medium text-muted-foreground/80">
            {isRTL ? "הצג" : "Show"}
          </p>
          <Select
            dir={dir}
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
            disabled={table.getRowModel().rows.length === 0}
          >
            <SelectTrigger className="h-8 w-[70px] transition-colors hover:bg-muted/50 focus:ring-1 focus:ring-primary/20 disabled:opacity-50">
              <SelectValue className="text-sm" />
            </SelectTrigger>
            <SelectContent align={isRTL ? "end" : "start"}>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  value={`${pageSize}`}
                  className="text-sm transition-colors hover:bg-muted/50"
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm font-medium text-muted-foreground/80">
            {isRTL ? "שורות" : "rows"}
          </p>
        </div>

        {/* Pagination Controls */}
        <div className="rtl:gap-x-reverse flex items-center gap-2">
          <div className="rtl:gap-x-reverse flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 transition-colors hover:bg-muted/50 focus:ring-1 focus:ring-primary/20 disabled:opacity-40"
            >
              <FirstIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="h-8 w-8 transition-colors hover:bg-muted/50 focus:ring-1 focus:ring-primary/20 disabled:opacity-40"
            >
              <PrevIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="rtl:gap-x-reverse flex items-center gap-2 px-1">
            <p className="text-sm font-medium text-muted-foreground/80">
              {isRTL ? "עמוד" : "Page"}
            </p>
            <span className="min-w-[1ch] text-center text-sm font-semibold tabular-nums text-foreground">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <p className="text-sm font-medium text-muted-foreground/80">
              {isRTL ? "מתוך" : "of"}
            </p>
            <span className="min-w-[1ch] text-center text-sm font-semibold tabular-nums text-foreground">
              {table.getPageCount()}
            </span>
          </div>

          <div className="rtl:gap-x-reverse flex items-center gap-1">
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 transition-colors hover:bg-muted/50 focus:ring-1 focus:ring-primary/20 disabled:opacity-40"
            >
              <NextIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
              className="h-8 w-8 transition-colors hover:bg-muted/50 focus:ring-1 focus:ring-primary/20 disabled:opacity-40"
            >
              <LastIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DataTablePagination;
