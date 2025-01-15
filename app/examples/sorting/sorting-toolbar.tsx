import { ToolbarConfig } from "@/types";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
export const toolbarConfig: ToolbarConfig = {
  controls: [
    {
      type: "filter",
      index: 2,
      column: "symbol",
      placeholder: "Filter by currency",
      dynamic: true,
    },
    {
      type: "columnVisibility",
      index: 3,
    },
    {
      type: "action",
      index: 0,
      element: <SortingToolbar />,
    },
  ],
};

export function SortingToolbar() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 3000);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex-1" />
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              disabled={isRefreshing}
              className={cn(
                "ml-auto transition-colors",
                isRefreshing && "bg-muted"
              )}
            >
              <RefreshCw
                className={cn(
                  "h-4 w-4 mr-2 transition-all duration-200",
                  isRefreshing && "animate-spin"
                )}
              />
              {isRefreshing ? "Refreshing..." : "Refresh Data"}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Refresh currency rates</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}
