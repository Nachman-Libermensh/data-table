export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
}
export interface ElectionResponse {
  result: {
    records: ElectionRecord[];
    total: number;
  };
  success: boolean;
}

export interface ElectionRecord {
  _id: number;
  "סמל ועדה": number;
  "שם ישוב": string;
  "סמל ישוב": number;
  בזב: number;
  מצביעים: number;
  פסולים: number;
  כשרים: number;
  אמת: number;
  מחל: number;
  עם: number;
  שס: number;
  ג: number;
}
export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  stock: number;
  status: "in-stock" | "low-stock" | "out-of-stock";
}

export interface ToolbarProps {
  selectedRows: Product[];
  onDelete: () => void;
  onStatusUpdate: (status: Product["status"]) => void;
}
export interface ExchangeRate {
  symbol: string;
  name: string;
  rate: number;
  change: number;
  volume: number;
  lastUpdate: string;
}
export interface Post {
  id: number;
  userId: number; // Add userId field
  title: string;
  body: string;
}
export interface Character {
  name: string;
  height: string;
  mass: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  species: string;
}
