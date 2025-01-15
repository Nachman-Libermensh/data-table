# Reusable Data Table Component

A flexible and customizable data table component built with Next.js, shadcn/ui, and TanStack Table.

## Dependencies

### Required shadcn/ui Components

- Table
- Button
- Input
- Select
- DropdownMenu

### Core Dependencies

- @tanstack/react-table

## Component API

### DataTable Component

#### Required Props

- `columns: ColumnDef<TData, TValue>[]` - Column definitions
- `data: TData[]` - Data array to be displayed

#### Optional Props

- `toolbar?: ToolbarConfig` - Configuration for table toolbar
- `onRowClick?: (row: Row<TData>) => void` - Handler for row click events
- `renderSubRow?: (row: Row<TData>) => React.ReactNode` - Render function for expandable row content
- `selectedId?: string` - ID of currently selected row
- `expandable?: boolean` - Enable row expansion functionality

### Usage Examples

Basic column implementation with DataTableColumnHeader:

```tsx
const columns: ColumnDef<YourDataType>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Date" />
    ),
  },
];
```

Basic implementation:

```tsx
import { DataTable } from "@/components/data-table";

export default function TableView() {
  const columns = [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
    },
    // ...more columns
  ];

  const data = [
    { id: 1, name: "Example" },
    // ...more data
  ];

  return <DataTable columns={columns} data={data} />;
}
```

With toolbar and row expansion:

```tsx
const toolbar: ToolbarConfig = {
  controls: [
    {
      type: "search",
      column: "name",
      placeholder: "Search names...",
      index: 0,
    },
    {
      type: "filter",
      column: "status",
      placeholder: "Filter status",
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      index: 1,
    },
    {
      type: "action",
      label: "Add New",
      onClick: () => {},
      index: 2,
    },
  ],
};

return (
  <DataTable
    columns={columns}
    data={data}
    toolbar={toolbar}
    expandable={true}
    renderSubRow={(row) => (
      <div className="p-4">Expanded content for {row.original.name}</div>
    )}
  />
);
```

### Internal Context and Hooks

The component uses React Context to share table state and functionality through `useTable` hook:

#### useTable Hook

Provides access to all TanStack Table features and internal state:

```tsx
const table = useTable<YourDataType>();

// Available features:
table.getRowModel(); // Access row data
table.getHeaderGroups(); // Access header groups
table.getState(); // Access table state
table.getColumn(columnId); // Get column by ID
table.previousPage(); // Pagination control
table.nextPage(); // Pagination control
table.setPageSize(); // Set items per page
```

### Toolbar Configuration

The ToolbarConfig interface supports three types of controls:

```typescript
interface ToolbarConfig {
  controls: Array<{
    type: "search" | "filter" | "action";
    index?: number;
    // For search controls
    column?: string;
    placeholder?: string;
    // For filter controls
    options?: Array<{ label: string; value: string }>;
    // For action controls
    label?: string;
    onClick?: () => void;
    variant?: string;
    icon?: React.ReactNode;
    element?: React.ReactNode;
  }>;
}
```

### Features

- RTL support
- Sortable columns
- Column filtering
- Pagination
- Row expansion
- Custom toolbar controls
- Row actions
- Context-based state management

### Known Issues and Future Improvements

#### Toolbar Implementation

The current toolbar implementation has several limitations and needs improvement:

1. **Configuration Structure**: The current ToolbarConfig interface needs to be simplified and made more intuitive.
2. **Flexibility Issues**: The toolbar's sorting mechanism and control rendering need to be more flexible.
3. **RTL Support**: Better RTL support for toolbar controls is needed.
4. **Type Safety**: The toolbar configuration types need to be more strictly typed.

Planned improvements:

- Redesign the toolbar configuration API
- Add better type inference for control options
- Implement more flexible control positioning
- Add support for control groups
- Improve RTL layout handling

Until these improvements are implemented, consider the toolbar feature as beta and subject to breaking changes.

## License

MIT License
