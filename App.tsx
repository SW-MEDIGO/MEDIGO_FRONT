import React from "react";
import { ThemeProvider } from "styled-components/native";
import { HomeScreen } from "./src/screens";
import { theme } from "./src/styles";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeScreen />
    </ThemeProvider>
  );
}
