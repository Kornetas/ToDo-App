import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Szukamy <div id="root"> w index.html i tam montujemy Reacta
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
