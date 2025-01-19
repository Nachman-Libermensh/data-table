import { ArrowDownIcon, ArrowUpIcon, EyeOffIcon } from "lucide-react";
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
  const isRTL = dir === "rtl";

  if (!column.getCanSort()) {
    return (
      <div
        className={cn(
          "text-sm font-medium text-muted-foreground/70",
          "group-hover/header:text-muted-foreground/80",
          "transition-colors duration-200",
          className
        )}
      >
        {title}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex items-center space-x-2 rtl:space-x-reverse",
        className
      )}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              // RTL-aware spacing
              isRTL ? "-mr-2" : "-ml-2",
              // State-based styling
              column.getIsSorted() && "bg-primary/5 text-primary font-medium",
              // Hover and open states
              "hover:bg-accent/40 data-[state=open]:bg-accent/50"
            )}
          >
            <span>{title}</span>
            {column.getIsSorted() && (
              <div
                className={cn(
                  "animate-in fade-in duration-200",
                  isRTL ? "mr-2" : "ml-2"
                )}
              >
                {column.getIsSorted() === "desc" ? (
                  <ArrowDownIcon className="h-4 w-4" />
                ) : (
                  <ArrowUpIcon className="h-4 w-4" />
                )}
              </div>
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align={isRTL ? "end" : "start"}
          className="w-[145px] animate-in fade-in-50 zoom-in-95 duration-100"
        >
          <DropdownMenuItem
            onClick={() => column.toggleSorting(false)}
            className={cn(
              "flex items-center cursor-pointer px-3 py-1.5",
              "hover:bg-accent/40 transition-colors",
              isRTL && "flex-row-reverse text-right"
            )}
          >
            <ArrowUpIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span className="text-sm px-2">
              {isRTL ? "סדר עולה" : "Sort A-Z"}
            </span>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => column.toggleSorting(true)}
            className={cn(
              "flex items-center px-3 cursor-pointer  py-1.5",
              "hover:bg-accent/40 transition-colors",
              isRTL && "flex-row-reverse text-right"
            )}
          >
            <ArrowDownIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span className="text-sm px-2">
              {isRTL ? "סדר יורד" : "Sort Z-A"}
            </span>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="my-1" />

          <DropdownMenuItem
            onClick={() => column.toggleVisibility(false)}
            className={cn(
              "flex items-center px-3 cursor-pointer  py-1.5",
              "hover:bg-accent/40 transition-colors",
              isRTL && "flex-row-reverse text-right"
            )}
          >
            <EyeOffIcon className="h-3.5 w-3.5 text-muted-foreground/70" />
            <span className="text-sm px-2 text-nowrap">
              {isRTL ? "הסתר עמודה" : "Hide column"}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
