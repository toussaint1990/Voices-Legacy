import React from "react";
import { createRoot } from "react-dom/client";
import MainApp from "./MainApp";
import "./index.css";
// IMPORTANT: initialize i18n before App renders
import "./i18n";
// ✅ This is your main entry point
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <MainApp />
    </React.StrictMode>
  );
} else {
  console.error("Root element not found!");
}