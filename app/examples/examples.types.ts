export interface ExchangeRate {
  key: string;
  currentExchangeRate: number;
  currentChange: number;
  unit: number;
  lastUpdate: string;
}

export interface HistoricalRate {
  date: string;
  rate: number;
  change: number;
}
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
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
