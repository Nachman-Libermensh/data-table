# Reusable Data Table Component

A flexible and customizable data table component built with Next.js, shadcn/ui, and TanStack Table. This component was developed during ongoing work projects and will continue to evolve as new use cases and improvements are identified.

## Overview

While it's impossible to cover every possible use case for data tables, this component aims to provide a solid foundation for common scenarios encountered in web applications. The component will be continuously improved and updated based on real-world requirements and feedback.

## Features

- ✅ Full RTL support
- 🔍 Advanced search and filtering
- 📊 Column sorting
- 📑 Pagination
- 📱 Responsive design
- 🔄 Row expansion
- 🎯 Custom toolbar controls
- 📋 Row actions
- 🔄 Context-based state management

## Dependencies

### Required Core Dependencies

```bash
npm install @tanstack/react-table
```

### Required shadcn/ui Components

This project utilizes the following shadcn/ui components:

- Table (`@/components/ui/table`)
- Button (`@/components/ui/button`)
- Input (`@/components/ui/input`)
- Select (`@/components/ui/select`)
- DropdownMenu (`@/components/ui/dropdown-menu`)

Visit [shadcn/ui](https://ui.shadcn.com/) for detailed documentation and installation instructions for each component.

### TanStack Table

The table functionality is powered by [TanStack Table](https://tanstack.com/table/v8) (formerly React Table), providing robust table features like sorting, filtering, and pagination.

## Installation

1. Install the required dependencies as shown above

2. Copy the following from this repository to your project:

   - The entire `components/data-table` directory
   - The types defined in `types.ts`

3. Ensure your project has the necessary shadcn/ui components installed

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

### Advanced Features

#### Context-Based State Management

The table uses React Context to provide access to table state and functionality throughout its components:

```tsx
const table = useTable<YourDataType>();
```

#### Row Expansion System

Support for expandable rows with custom content:

```tsx
<DataTable
  expandable={true}
  renderSubRow={(row) => (
    <div className="p-4">Custom expansion content for {row.original.name}</div>
  )}
/>
```

#### Toolbar System

Note: Currently in beta, planned for improvements.

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

> **Note:** You can expose additional TanStack Table functionality by editing the useTable hook defined in the DataTableLayout file. Any TanStack Table functionality you want to expose for use in child components will need to be included in this file.

### Toolbar Configuration

The toolbar system supports four types of controls: search, filter, action, and column visibility.

```typescript
interface ToolbarConfig {
  controls: ToolbarControl[];
}

type ToolbarControl =
  | SearchControl
  | FilterControl
  | ActionControl
  | ColumnVisibilityControl;

interface SearchControl {
  index?: number;
  type: "search";
  column: string;
  placeholder?: string;
}

interface FilterControl {
  index?: number;
  type: "filter";
  column: string;
  options?: { label: string; value: string }[];
  placeholder?: string;
  dynamic?: boolean; // When true, options are generated from unique column values
}

interface ActionControl {
  index?: number;
  type: "action";
  element?: React.ReactNode; // Custom element for the action
  label?: string; // Used when element is not provided
  icon?: React.ReactNode; // Used when element is not provided
  onClick?: () => void; // Used when element is not provided
  variant?: "default" | "outline" | "ghost";
}

interface ColumnVisibilityControl {
  index?: number;
  type: "columnVisibility";
  columns?: string[]; // Optional - if not provided, shows all columns
}
```

Example usage:

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
      options: [
        { label: "Active", value: "active" },
        { label: "Inactive", value: "inactive" },
      ],
      placeholder: "Filter by status",
      index: 1,
    },
    {
      type: "filter",
      column: "category",
      dynamic: true, // Will generate options from unique values in the category column
      placeholder: "Select category",
      index: 2,
    },
    {
      type: "action",
      label: "Add New",
      icon: <PlusIcon className="w-4 h-4" />,
      onClick: () => console.log("Add new clicked"),
      variant: "default",
      index: 3,
    },
    {
      type: "action",
      element: <CustomButton>Custom Action</CustomButton>, // Custom element
      index: 4,
    },
    {
      type: "columnVisibility",
      columns: ["name", "status", "category"],
      index: 5,
    },
  ],
};
```

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

### Component Architecture

#### Core Components

- `DataTableLayout` - Main component wrapper
- `DataTableHeader` - Table header management
- `DataTableBody` - Table body and row management
- `DataTableToolBar` - Toolbar controls (Beta)
- `DataTableColumnHeader` - Column header with sort controls
- `DataTableRowActions` - Row action menu
- `DataTablePagination` - Pagination controls

### Best Practices

1. Always use `DataTableColumnHeader` for basic column headers
2. Implement error boundaries around the table component
3. Consider pagination for large datasets
4. Use proper typing for your data structures
5. Implement proper loading states

### Contributing

Found a bug or want to contribute? Please feel free to:

1. Open an issue
2. Submit a pull request
3. Suggest improvements

## License

MIT License
