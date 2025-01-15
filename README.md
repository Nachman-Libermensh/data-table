# Reusable Data Table Component

A flexible and customizable data table component built with Next.js, shadcn/ui, and TanStack Table. This component was developed during ongoing work projects and will continue to evolve as new use cases and improvements are identified.

## Overview

While it's impossible to cover every possible use case for data tables, this component aims to provide a solid foundation for common scenarios encountered in web applications. The component will be continuously improved and updated based on real-world requirements and feedback.

## Dependencies

### shadcn/ui Components

This project utilizes the following shadcn/ui components:

- Table
- Button
- Input
- Select
- Checkbox

Visit [shadcn/ui](https://ui.shadcn.com/) for detailed documentation and installation instructions for each component.

### TanStack Table

The table functionality is powered by [TanStack Table](https://tanstack.com/table/v8) (formerly React Table), providing robust table features like sorting, filtering, and pagination.

## Installation

1. Install the required dependencies:

```bash
npm install @tanstack/react-table
# Install shadcn/ui components as needed
```

2. Copy the following from this repository to your project:
   - The entire `components` directory
   - The types defined in `types.ts`

## Usage Example

```tsx
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

export default function YourComponent() {
  const data = [
    { id: 1, name: "John", age: 30 },
    { id: 2, name: "Jane", age: 25 },
  ];

  return (
    <DataTable columns={columns} data={data} searchKey="name" pagination />
  );
}
```

## Usage Examples

### Basic Column Definitions

```tsx
export const columns: ColumnDef<YourDataType>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <StatusBadge status={row.getValue("status")} />,
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => format(new Date(row.getValue("date")), "dd/MM/yyyy"),
  },
];
```

### Advanced Column with Custom Cell Rendering

```tsx
{
  accessorKey: "statistics",
  header: "Statistics",
  cell: ({ row }) => {
    const data = row.getValue("statistics") as string[];
    return (
      <div className="flex gap-2">
        <Badge>{data.length} Total</Badge>
        <Badge variant="outline">
          {data.filter(item => item.isActive).length} Active
        </Badge>
        <Badge variant="secondary">
          {data.filter(item.isComplete).length} Complete
        </Badge>
      </div>
    );
  },
}
```

### Toolbar Configuration

```tsx
const toolbar: ToolbarConfig = {
  controls: [
    {
      type: "search",
      column: "name",
      placeholder: "Search by name...",
      index: 0,
    },
    {
      type: "action",
      element: <CreateNewButton />,
      index: 1,
    },
    {
      type: "filter",
      options: ["Active", "Pending", "Completed"],
      column: "status",
      index: 2,
    },
  ],
};
```

### Complete Implementation Example

```tsx
export default function TableView() {
  return (
    <DataTable
      columns={columns}
      data={data}
      toolbar={toolbar}
      onRowClick={(row) => {
        router.push(`/details/${row.original.id}`);
      }}
      pagination
    />
  );
}
```

### Props Reference

| Prop       | Type                    | Description                    |
| ---------- | ----------------------- | ------------------------------ |
| columns    | `ColumnDef[]`           | Column definitions array       |
| data       | `T[]`                   | Data array to display          |
| toolbar    | `ToolbarConfig`         | Optional toolbar configuration |
| onRowClick | `(row: Row<T>) => void` | Optional row click handler     |
| pagination | `boolean`               | Enable/disable pagination      |
| searchKey  | `string`                | Key to use for global search   |

## Features

- Sortable columns
- Search/filtering
- Pagination
- Row selection
- Customizable column definitions
- Responsive design

## Advanced Features

### Expandable Rows with Sub-Components

The table supports expandable rows with custom sub-components:

## Component Architecture

### Core Components

#### DataTable (DataTableLayout)

Required Props:

- `columns: ColumnDef<TData, TValue>[]` - Table column definitions
- `data: TData[]` - Data array to display

Optional Props:

- `toolbar?: ToolbarConfig` - Toolbar configuration
- `onRowClick?: (row: Row<TData>) => void` - Row click handler
- `renderSubRow?: (row: Row<TData>) => React.ReactNode` - Sub-row render function
- `selectedId?: string` - Selected row ID
- `expandable?: boolean` - Enable row expansion

#### DataTableToolBar

Required Props:

- `config: ToolbarConfig` - Toolbar configuration object

## Changelog

### [Unreleased]

- Initial component release

### [0.1.0] - YYYY-MM-DD

- Basic table functionality
- Search and sort features
- Pagination implementation

## Contributing

This is an evolving project, and contributions are welcome! If you have improvements or new features to suggest, please feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## Future Improvements

- [ ] Advanced filtering options
- [ ] Export functionality
- [ ] Custom cell renderers
- [ ] Row actions
- [ ] Bulk actions
- [ ] Responsive improvements

## License

MIT License - Feel free to use and modify as needed.
