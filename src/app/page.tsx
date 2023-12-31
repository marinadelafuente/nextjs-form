"use client";

// Theme
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { customTheme } from "./theme";

// Components
import Form from "../components/form";
import { Paper } from "@mui/material";

export default function Home() {
  return (
    <Paper sx={{ height: "100%", maxHeight: "100%", bgcolor: "rgba(255, 255, 255, 0.40)", p: 3, width: "35.31rem", m: "0 auto", my: 4 }}>
      <ThemeProvider theme={customTheme}>
        <Form />
      </ThemeProvider>
    </Paper>
  );
}
