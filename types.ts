export type WithChildren = { children: React.ReactNode };
export type ToolbarControlType =
  | "search"
  | "filter"
  | "action"
  | "columnVisibility";

export interface SearchControl {
  index?: number;
  type: "search";
  column: string;
  placeholder?: string;
}

export interface FilterControl {
  index?: number;
  type: "filter";
  column: string;
  options?: { label: string; value: string }[]; // Make options optional
  placeholder?: string;
  dynamic?: boolean; // Add flag for dynamic options
}

export interface ActionControl {
  index?: number;
  type: "action";
  element?: React.ReactNode; // Add this
  // Make these optional since we might use element instead
  label?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "outline" | "ghost";
}

export interface ColumnVisibilityControl {
  index?: number;

  type: "columnVisibility";
  columns?: string[]; // Optional - if not provided, show all columns
}

export type ToolbarControl =
  | SearchControl
  | FilterControl
  | ActionControl
  | ColumnVisibilityControl;

export interface ToolbarConfig {
  controls: ToolbarControl[];
}
