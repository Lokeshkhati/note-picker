import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./contexts/theme-context";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth-context";
import { NotesProvider } from "./contexts/notes-context";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <NotesProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </NotesProvider>
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>
);
