import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./assets/css/style.css";               // CSS Bookly

import App from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
