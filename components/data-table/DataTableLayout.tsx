/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
  ExpandedState,
  Row,
  SortingState,
  Table as TableType,
  useReactTable,
  VisibilityState,
  ColumnResizeMode,
} from "@tanstack/react-table";
import { createContext, useContext, useRef, useState } from "react";

import { Table } from "../ui/table";
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";
import DataTablePagination from "./DataTablePagination";
import DataTableToolBar from "./DataTableToolBar";
import { ToolbarConfig } from "@/types";
import { Direction, DirectionProvider } from "./DirectionProvider";
import { cn } from "@/lib/utils";

interface TableContextType<TData> extends Omit<TableType<TData>, "options"> {
  enableColumnReorder?: boolean;
  enableColumnResize?: boolean;
  isDragging: string | null;
  handleDragStart: (e: React.DragEvent, columnId: string) => void;
  handleDragOver: (e: React.DragEvent) => void;
  handleDragEnter: (e: React.DragEvent, columnId: string) => void;
  handleDragLeave: (e: React.DragEvent) => void;
  handleDrop: (e: React.DragEvent, targetColumnId: string) => void;
  handleResizeStart: (columnId: string) => void;
  handleResizeEnd: () => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  direction?: Direction;
  toolbar?: ToolbarConfig;
  onRowClick?: (row: Row<TData>) => void;
  renderSubRow?: (row: Row<TData>) => React.ReactNode;
  selectedId?: string;
  expandable?: boolean;
  enableColumnResize?: boolean;
  enableColumnReorder?: boolean;
  columnResizeMode?: ColumnResizeMode;
}

const DataTableContext = createContext<TableContextType<any> | undefined>(
  undefined
);

export function useTable<TData>() {
  const context = useContext(DataTableContext) as TableContextType<TData>;
  if (!context) {
    throw new Error("useTable can only be used within a table provider");
  }
  return context;
}

export default function DataTableLayout<TData, TValue>({
  columns,
  data,
  toolbar,
  onRowClick,
  direction,
  enableColumnResize = false,
  enableColumnReorder = false,
  columnResizeMode = "onChange",
  selectedId,
  renderSubRow,
  expandable,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [resizingColumnId, setResizingColumnId] = useState<string | null>(null);
  const [columnOrder, setColumnOrder] = useState<string[]>(() =>
    columns.map((col) => col.id as string)
  );

  const tableRef = useRef<HTMLTableElement>(null);

  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      columnOrder,
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => expandable ?? false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    enableColumnResizing: enableColumnResize,
    columnResizeMode,
    columnResizeDirection: direction === "rtl" ? "rtl" : "ltr",
  });

  const handleResizeStart = (columnId: string) => {
    setIsResizing(true);
    setResizingColumnId(columnId);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
    setResizingColumnId(null);
  };
  // הוספת פונקציית handleDragEnd לניקוי עיצובים גם אם הגביה הופסקה באמצע:
  const handleDragEnd = (e: React.DragEvent) => {
    if (!enableColumnReorder) return;
    setIsDragging(null);

    if (tableRef.current) {
      tableRef.current.style.width = "";
      tableRef.current.style.tableLayout = "";
    }

    document.querySelectorAll(".column-drop-indicator").forEach((el) => {
      el.classList.remove("opacity-100");
      el.classList.add("opacity-0");
    });
  };
  // שינוי handleDragStart כך שיקרה גם handleDragEnd בסיום גרירה
  const handleDragStart = (e: React.DragEvent, columnId: string) => {
    if (!enableColumnReorder) return;
    setIsDragging(columnId);

    const headerContent =
      e.currentTarget instanceof HTMLElement
        ? e.currentTarget.querySelector(".header-content")?.textContent
        : "";

    if (headerContent) {
      const preview = document.createElement("div");
      preview.className =
        "px-4 py-2 bg-background/95 border rounded shadow-md text-sm font-medium fixed";
      preview.textContent = headerContent;
      preview.style.position = "fixed";
      preview.style.top = "-1000px";
      preview.style.left = "-1000px";
      preview.style.pointerEvents = "none";

      document.body.appendChild(preview);
      e.dataTransfer.setDragImage(preview, 0, 0);
      setTimeout(() => document.body.removeChild(preview), 0);
    }

    e.dataTransfer.setData("columnId", columnId);
    e.dataTransfer.effectAllowed = "move";

    if (tableRef.current) {
      tableRef.current.style.width = `${tableRef.current.offsetWidth}px`;
      tableRef.current.style.tableLayout = "fixed";
    }

    // רישום מאזין לאירוע dragend שינקה את העיצובים
    e.currentTarget.addEventListener(
      "dragend",
      (evt) =>
        handleDragEnd(evt as unknown as React.DragEvent<HTMLTableElement>),
      { once: true }
    );
  };
  const handleDragOver = (e: React.DragEvent) => {
    if (!enableColumnReorder) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDragEnter = (e: React.DragEvent, columnId: string) => {
    if (!enableColumnReorder || !isDragging || isDragging === columnId) return;
    e.preventDefault();

    const indicators = document.querySelectorAll(".column-drop-indicator");
    indicators.forEach((el) => {
      el.classList.remove("opacity-100");
      el.classList.add("opacity-0");
    });

    const currentIndicator = e.currentTarget.querySelector(
      ".column-drop-indicator"
    );
    if (currentIndicator) {
      currentIndicator.classList.remove("opacity-0");
      currentIndicator.classList.add("opacity-100");
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    if (!enableColumnReorder) return;
    const indicator = e.currentTarget.querySelector(".column-drop-indicator");
    if (indicator) {
      indicator.classList.remove("opacity-100");
      indicator.classList.add("opacity-0");
    }
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    if (!enableColumnReorder) return;
    e.preventDefault();

    const sourceId = e.dataTransfer.getData("columnId");
    if (!sourceId || sourceId === targetId) {
      setIsDragging(null);
      return;
    }

    const columns = table.getAllColumns();
    const sourceIndex = columns.findIndex((col) => col.id === sourceId);
    const targetIndex = columns.findIndex((col) => col.id === targetId);

    if (sourceIndex !== -1 && targetIndex !== -1) {
      const newOrder = [...columns.map((col) => col.id)];
      newOrder.splice(targetIndex, 0, newOrder.splice(sourceIndex, 1)[0]);
      table.setColumnOrder(newOrder);
    }

    setIsDragging(null);

    if (tableRef.current) {
      tableRef.current.style.width = "";
      tableRef.current.style.tableLayout = "";
    }

    document.querySelectorAll(".column-drop-indicator").forEach((el) => {
      el.classList.remove("opacity-100");
      el.classList.add("opacity-0");
    });
  };

  const contextValue = {
    ...table,
    enableColumnReorder,
    enableColumnResize,
    isDragging,
    handleDragStart,
    handleDragOver,
    handleDragEnter,
    handleDragLeave,
    handleDrop,
    handleResizeStart,
    handleResizeEnd,
  };

  return (
    <DataTableContext.Provider value={contextValue}>
      <DirectionProvider value={direction || "ltr"}>
        <section dir={direction || "ltr"} className="space-y-2 w-full px-1">
          {toolbar && <DataTableToolBar config={toolbar} />}
          <div
            className={cn(
              "rounded-md border bg-card shadow-sm overflow-hidden",
              isDragging && "cursor-grabbing"
            )}
          >
            <Table
              ref={tableRef}
              style={{
                width: "100%",
                tableLayout: isDragging ? "fixed" : "auto",
                borderCollapse: "separate",
                borderSpacing: 0,
              }}
              className={cn("w-full relative", isDragging && "select-none")}
            >
              <DataTableHeader />
              <DataTableBody
                onRowClick={onRowClick}
                selectedId={selectedId}
                renderSubRow={renderSubRow}
              />
            </Table>
          </div>
          <DataTablePagination />
        </section>
      </DirectionProvider>
    </DataTableContext.Provider>
  );
}
