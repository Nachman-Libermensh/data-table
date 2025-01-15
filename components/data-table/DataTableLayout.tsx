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
} from "@tanstack/react-table";
import { createContext, useContext, useState } from "react";

import { Table } from "../ui/table";
import DataTableHeader from "./DataTableHeader";
import DataTableBody from "./DataTableBody";
import DataTablePagination from "./DataTablePagination";
import DataTableToolBar from "./DataTableToolBar";
import { ToolbarConfig } from "@/types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  toolbar?: ToolbarConfig;
  onRowClick?: (row: Row<TData>) => void;
  renderSubRow?: (row: Row<TData>) => React.ReactNode;
  selectedId?: string;
  expandable?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DataTableContext = createContext<TableType<any> | undefined>(undefined);
export function useTable<TData>() {
  const context = useContext(DataTableContext) as TableType<TData>;
  if (!context) {
    throw new Error("אתה יכול להשתמש ב-useTable רק בתוך ספק הטבלה");
  }

  return context;
}

export default function DataTableLayout<TData, TValue>({
  columns,
  data,
  toolbar,
  onRowClick,
  selectedId,
  renderSubRow,
  expandable,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    onExpandedChange: setExpanded,
    getExpandedRowModel: getExpandedRowModel(),
    getRowCanExpand: () => expandable ?? false,
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  return (
    <DataTableContext.Provider value={table}>
      <section className="px-1 py-2">
        {toolbar && <DataTableToolBar config={toolbar} />}
        <div className="rounded-md border">
          <Table>
            <DataTableHeader />
            <DataTableBody
              onRowClick={onRowClick}
              selectedId={selectedId}
              renderSubRow={renderSubRow} // Add this line
            />
          </Table>
        </div>
        <DataTablePagination />
      </section>
    </DataTableContext.Provider>
  );
}
