import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
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

function DataTablePagination() {
  const table = useTable();

  return (
    <div className="py-2">
      <div className="flex justify-between">
        <div className="flex items-center self-start">
          <p className="ml-1 text-sm font-medium text-muted-foreground">הצג</p>
          <Select
            dir="rtl"
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            disabled={table.getRowModel().rows.length === 0}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue
                className="text-sm"
                placeholder={table.getState().pagination.pageSize}
              />
            </SelectTrigger>
            <SelectContent className="w-[70px] min-w-[70px]">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem
                  key={pageSize}
                  className="cursor-pointer text-sm transition-colors hover:text-primary"
                  value={`${pageSize}`}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="mr-1 text-sm font-medium text-muted-foreground">
            שורות
          </p>
        </div>

        <div className="flex items-center">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">דלג לעמוד הראשון</span>
            <ArrowRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">חזור לעמוד קודם</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium text-muted-foreground">
            עמוד {table.getState().pagination.pageIndex + 1} מתוך{" "}
            {table.getPageCount()}
          </div>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">עבור לעמוד הבא</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">דלג לעמוד האחרון</span>
            <ArrowLeftIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
export default DataTablePagination;
