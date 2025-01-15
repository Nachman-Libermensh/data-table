import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uniqueValuesInArray } from "@/lib/utils";
import { ToolbarConfig, ToolbarControl } from "@/types/types.client";

import { Columns, Search } from "lucide-react";
import { useTable } from "./DataTableLayout";

export default function DataTableToolBar({
  config,
}: {
  config: ToolbarConfig;
}) {
  const { getColumn } = useTable();
  const sortToolBar = (config: ToolbarConfig) => {
    config.controls.sort((a, b) => {
      if (a.type === "action" && b.type !== "action") {
        return -1;
      } else if (
        (a.type === "action" && b.type === "action") ||
        (a.type !== "action" && b.type !== "action")
      ) {
        if (a.index && b.index) {
          return a.index - b.index;
        } else if (a.index) {
          return -1;
        } else {
          return 1;
        }
      } else {
        return 1;
      }
    });
  };
  sortToolBar(config);
  const renderControl = (control: ToolbarControl) => {
    switch (control.type) {
      case "search":
        return (
          <Input
            type="search"
            placeholder={control.placeholder}
            value={
              (getColumn(control.column)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              getColumn(control.column)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        );

      case "filter": {
        const column = getColumn(control.column);

        if (control.options) {
          return (
            <Select
              dir="rtl"
              value={(column?.getFilterValue() as string) ?? ""}
              onValueChange={(value) => {
                column?.setFilterValue(value);
              }}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder={control.placeholder} />
              </SelectTrigger>
              <SelectContent>
                {control.options.map((option) => (
                  <SelectItem
                    key={option.value}
                    className="cursor-pointer"
                    value={option.value}
                  >
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          );
        }

        // Fallback to dynamic options
        const items = column?.getFacetedUniqueValues();
        const uniqueItems = Array.from(items?.keys() || []);
        return (
          <Select
            dir="rtl"
            value={(column?.getFilterValue() as string) ?? ""}
            onValueChange={(value) => column?.setFilterValue(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={control.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {uniqueItems.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      }

      case "action":
        return control.element ? (
          control.element
        ) : (
          <Button
            variant={control.variant || "default"}
            onClick={control.onClick}
          >
            {control.icon}
            {control.label}
          </Button>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex items-center gap-2 py-4">
      {config.controls.map((control, index) => (
        <div key={index}>{renderControl(control)}</div>
      ))}
    </div>
  );
}
