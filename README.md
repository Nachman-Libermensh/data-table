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

## Features

- Sortable columns
- Search/filtering
- Pagination
- Row selection
- Customizable column definitions
- Responsive design

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
