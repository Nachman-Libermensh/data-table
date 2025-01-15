/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  FoldHorizontal,
  Glasses,
  Grab,
  Grip,
  MoreVertical,
  Thermometer,
} from "lucide-react";
import { Row } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { WithChildren } from "../../types";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({
  row,
  children,
}: WithChildren & DataTableRowActionsProps<TData>) {
  return (
    <DropdownMenu dir="rtl">
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          {/* <Grip className="h-4 w-4" /> */}
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">תפריט פעולות</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>{children}</DropdownMenuContent>
    </DropdownMenu>
  );
}
