import React from "react";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "styled-components/native";
import { HomeScreen } from "./src/screens";
import { theme } from "./src/styles";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <HomeScreen />
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
