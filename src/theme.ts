// src/theme.ts
import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  colors: {
    // Customize your light mode colors here
    brand: {
      50: "#e3f2fd",
      100: "#bbdefb",
      200: "#90caf9",
      300: "#64b5f6",
      400: "#42a5f5",
      500: "#2196f3", // main
      600: "#1e88e5",
      700: "#1976d2",
      800: "#1565c0",
      900: "#0d47a1",
    },
    background: {
      light: "#f1efe7",
      dark: "#1a202c",
    },
    text: {
      light: "#1a202c",
      dark: "#f7fafc",
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: props.colorMode === "light" ? "background.light" : "background.dark",
        color: props.colorMode === "light" ? "text.light" : "text.dark",
      },
    }),
  },
});

export default theme;
