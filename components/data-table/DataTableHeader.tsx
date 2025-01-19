/* eslint-disable @typescript-eslint/no-explicit-any */
import { flexRender, Header } from "@tanstack/react-table";
import { TableHead, TableHeader, TableRow } from "../ui/table";
import { useTable } from "./DataTableLayout";
import { useDirection } from "./DirectionProvider";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

export default function DataTableHeader() {
  const {
    getHeaderGroups,
    enableColumnReorder,
    enableColumnResize,
    isDragging,
    handleDragStart,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleResizeStart,
    handleResizeEnd,
  } = useTable();

  const dir = useDirection();
  const isRTL = dir === "rtl";
  const [resizeActive, setResizeActive] = useState(false);
  const [resizingColumnId, setResizingColumnId] = useState<string | null>(null);
  const dragStartTimeoutRef = useRef<NodeJS.Timeout>();
  const mousePositionRef = useRef<{ x: number; y: number } | null>(null);

  const handleHeaderResizeStart = useCallback(
    (e: React.MouseEvent | React.TouchEvent, header: Header<any, unknown>) => {
      e.preventDefault();
      setResizeActive(true);
      setResizingColumnId(header.id);
      handleResizeStart(header.id);
      document.body.style.userSelect = "none";

      if ("touches" in e) {
        mousePositionRef.current = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      } else {
        mousePositionRef.current = {
          x: e.clientX,
          y: e.clientY,
        };
      }

      header.getResizeHandler()(e);
    },
    [handleResizeStart]
  );

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (resizeActive) {
        setResizeActive(false);
        setResizingColumnId(null);
        handleResizeEnd();
        document.body.style.userSelect = "";
        document.body.style.cursor = "";
        mousePositionRef.current = null;
      }
    };

    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (resizeActive && mousePositionRef.current) {
        const deltaX = e.clientX - mousePositionRef.current.x;
        if (Math.abs(deltaX) > 5) {
          document.body.style.cursor = "col-resize";
        }
      }
    };

    window.addEventListener("mouseup", handleGlobalMouseUp);
    window.addEventListener("touchend", handleGlobalMouseUp);
    window.addEventListener("mousemove", handleGlobalMouseMove);

    return () => {
      window.removeEventListener("mouseup", handleGlobalMouseUp);
      window.removeEventListener("touchend", handleGlobalMouseUp);
      window.removeEventListener("mousemove", handleGlobalMouseMove);
      if (dragStartTimeoutRef.current) {
        clearTimeout(dragStartTimeoutRef.current);
      }
      document.body.style.userSelect = "";
      document.body.style.cursor = "";
    };
  }, [resizeActive, handleResizeEnd]);

  const handleHeaderDragStart = useCallback(
    (e: React.DragEvent, columnId: string) => {
      if (resizeActive) {
        e.preventDefault();
        return;
      }
      e.stopPropagation();
      handleDragStart(e, columnId);
    },
    [resizeActive, handleDragStart]
  );

  return (
    <TableHeader
      dir={dir || "ltr"}
      className={cn("bg-muted/5", isDragging && "select-none")}
    >
      {getHeaderGroups().map((headerGroup) => (
        <TableRow
          key={headerGroup.id}
          className={cn(
            "border-b transition-colors relative hover:bg-muted/5",
            isDragging && [
              "border-primary/20",
              "after:absolute after:inset-0",
              "after:pointer-events-none",
              "after:border-2 after:border-primary/20 after:border-dashed",
              "after:rounded-md after:transition-opacity",
              "after:opacity-0 group-hover/header:after:opacity-100",
            ]
          )}
        >
          {headerGroup.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              draggable={
                enableColumnReorder && !header.isPlaceholder && !resizeActive
              }
              onDragStart={(e) => handleHeaderDragStart(e, header.id)}
              // החלפת onDragOver כך שיתמוך בביטול הפעולה וקבלת ה־drop ב־ltr:
              onDragOver={(e) => {
                e.preventDefault();
                handleDragOver(e, header.id);
              }}
              onDragEnter={(e) => handleDragEnter(e, header.id)}
              onDragLeave={handleDragLeave}
              onDrop={(e) => handleDrop(e, header.id)}
              style={{
                width: header.getSize(),
                position: "relative",
                transition: resizeActive ? "none" : "all 150ms ease",
                minWidth: header.getSize(),
              }}
              className={cn(
                "h-11 px-3 select-none group/header relative",
                isRTL ? "text-right" : "text-left",
                enableColumnReorder &&
                  !resizeActive &&
                  !header.isPlaceholder &&
                  "hover:cursor-grab active:cursor-grabbing",
                isDragging === header.id && [
                  "opacity-50 bg-accent/5 scale-[0.98]",
                ],
                isDragging &&
                  isDragging !== header.id && [
                    "hover:bg-accent/10",
                    "before:absolute before:inset-y-[10%]",
                    "before:w-0.5 before:bg-primary before:opacity-0 hover:before:opacity-100",
                    "before:transition-all before:duration-200",
                    isRTL ? "before:-left-px" : "before:-right-px",
                  ]
              )}
            >
              {isDragging && isDragging !== header.id && (
                <div
                  className={cn(
                    "absolute inset-y-[10%]",
                    isRTL ? "-left-px" : "-right-px",
                    "w-1 bg-primary/40 opacity-0 column-drop-indicator transition-all duration-200"
                  )}
                />
              )}
              <div
                className={cn(
                  "flex items-center gap-2 h-full",
                  isRTL && "flex-row-reverse"
                )}
              >
                {enableColumnReorder && !header.isPlaceholder && (
                  <GripVertical
                    className={cn(
                      "w-4 h-4 shrink-0 text-muted-foreground/40",
                      "opacity-0 group-hover/header:opacity-100",
                      "transition-all duration-150",
                      isDragging && "opacity-100",
                      "hover:text-muted-foreground/70"
                    )}
                  />
                )}
                <div className="flex-1 min-w-0 overflow-hidden text-ellipsis whitespace-nowrap header-content">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </div>
              </div>
              {enableColumnResize && header.column.getCanResize() && (
                <div
                  onMouseDown={(e) => handleHeaderResizeStart(e, header)}
                  onTouchStart={(e) => handleHeaderResizeStart(e, header)}
                  className={cn(
                    "absolute top-0 h-full",
                    isRTL ? "-left-1" : "-right-1",
                    "w-2 cursor-col-resize opacity-0 group-hover/header:opacity-100",
                    resizeActive && resizingColumnId === header.id
                      ? "opacity-100 bg-primary/40 w-1"
                      : "hover:bg-primary/20",
                    "transition-all duration-150"
                  )}
                  role="separator"
                  aria-orientation="vertical"
                />
              )}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}
