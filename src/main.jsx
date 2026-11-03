import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CuriousMinds from "./pages/CuriousMinds/CuriousMinds.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CuriousMinds />
  </StrictMode>
);
