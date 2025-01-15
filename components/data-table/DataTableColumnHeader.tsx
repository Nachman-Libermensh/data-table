import {
  ArrowDownIcon,
  ArrowUpIcon,

  // CaretSortIcon,
  // EyeNoneIcon,
} from "lucide-react";
import { Column } from "@tanstack/react-table";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDirection } from "./DirectionProvider";

interface DataTableColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export function DataTableColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: DataTableColumnHeaderProps<TData, TValue>) {
  const dir = useDirection();

  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div
      className={cn(
        "flex items-center",
        dir === "rtl" ? "space-x-reverse" : "space-x-2",
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "h-8 data-[state=open]:bg-accent",
              dir === "rtl" ? "-mr-3" : "-ml-3"
            )}
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDownIcon
                className={cn("h-4 w-4", dir === "rtl" ? "mr-2" : "ml-2")}
              />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUpIcon
                className={cn("h-4 w-4", dir === "rtl" ? "mr-2" : "ml-2")}
              />
            ) : null}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align={dir === "rtl" ? "end" : "start"}>
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUpIcon
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground/70",
                dir === "rtl" ? "ml-2" : "mr-2"
              )}
            />
            {dir === "rtl" ? "סדר עולה" : "Asc"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDownIcon
              className={cn(
                "h-3.5 w-3.5 text-muted-foreground/70",
                dir === "rtl" ? "ml-2" : "mr-2"
              )}
            />
            {dir === "rtl" ? "סדר יורד" : "Desc"}
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
            {dir === "rtl" ? "הסתר" : "Hide"}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
