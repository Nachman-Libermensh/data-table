import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
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
    <div className="py-2">
      <div className={cn("flex items-center justify-between")}>
        {/* Page Size Controls */}
        <div
          className={cn("flex items-center gap-1")}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <p className="text-sm font-medium text-muted-foreground">
            {isRTL ? "הצג" : "Show"}
          </p>
          <Select
            dir={dir}
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => table.setPageSize(Number(value))}
            disabled={table.getRowModel().rows.length === 0}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue className="text-sm" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-sm font-medium text-muted-foreground">
            {isRTL ? "שורות" : "rows"}
          </p>
        </div>

        {/* Pagination Controls */}
        <div
          className={cn("flex items-center gap-2")}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <FirstIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <PrevIcon className="h-4 w-4" />
          </Button>

          <div className={cn("flex items-center gap-1")}>
            <p className="text-sm font-medium">{isRTL ? "עמוד" : "Page"}</p>
            <span className="text-sm font-medium">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <p className="text-sm font-medium">{isRTL ? "מתוך" : "of"}</p>
            <span className="text-sm font-medium">{table.getPageCount()}</span>
          </div>

          <Button
            variant="outline"
            size="icon"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <NextIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <LastIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DataTablePagination;
