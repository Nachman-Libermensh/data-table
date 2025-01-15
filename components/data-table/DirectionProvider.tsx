import { createContext, useContext } from "react";

export type Direction = "ltr" | "rtl";
const DirectionContext = createContext<Direction>("ltr");

export const useDirection = () => useContext(DirectionContext);
export const DirectionProvider = DirectionContext.Provider;
