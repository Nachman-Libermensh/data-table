import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

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
  const FirstIcon = dir === "rtl" ? ChevronLast : ChevronFirst;
  const PrevIcon = dir === "rtl" ? ChevronRight : ChevronLeft;
  const NextIcon = dir === "rtl" ? ChevronLeft : ChevronRight;
  const LastIcon = dir === "rtl" ? ChevronFirst : ChevronLast;
  return (
    <div className="py-2">
      <div
        className={`flex ${
          dir === "rtl" ? "flex-row-reverse" : ""
        } justify-between`}
      >
        <div
          className={`flex items-center ${
            dir === "rtl" ? "flex-row-reverse" : ""
          }`}
        >
          <p
            className={`${
              dir === "rtl" ? "mr-1" : "ml-1"
            } text-sm font-medium text-muted-foreground`}
          >
            {dir === "rtl" ? "הצג" : "Show"}
          </p>
          <Select
            dir={dir}
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
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
          <p
            className={`${
              dir === "rtl" ? "mr-1" : "ml-1"
            } text-sm font-medium text-muted-foreground`}
          >
            {dir === "rtl" ? "שורות" : "rows"}
          </p>
        </div>

        <div
          className={`flex items-center space-x-2 ${
            dir === "rtl" ? "flex-row-reverse space-x-reverse" : ""
          }`}
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
          <div className="flex items-center gap-1">
            <p className="text-sm font-medium">
              {dir === "rtl" ? "עמוד" : "Page"}
            </p>
            <span className="text-sm font-medium">
              {table.getState().pagination.pageIndex + 1}
            </span>
            <p className="text-sm font-medium">
              {dir === "rtl" ? "מתוך" : "of"}
            </p>
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
