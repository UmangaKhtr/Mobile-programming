import React, { createContext, useContext, useMemo, useState } from "react";
import { palette } from "../theme";

const ThemeCtx = createContext(null);
export const useTheme = () => useContext(ThemeCtx);

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState("dark");
  const value = useMemo(() => ({ mode, setMode, t: palette[mode] }), [mode]);
  return <ThemeCtx.Provider value={value}>{children}</ThemeCtx.Provider>;
}
