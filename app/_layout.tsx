import "react-native-gesture-handler";
import React from "react";
import { Slot } from "expo-router";
import { ThemeProvider } from "../src/ui/Themed"; // keep this if your file is themes.js

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Slot />
    </ThemeProvider>
  );
}
