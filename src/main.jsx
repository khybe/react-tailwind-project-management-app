import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { ProjectProvider } from "./context/projectContext.jsx"; // Context provider for managing global project state

import "./index.css"; // Global CSS file

// Rendering the root component wrapped in ProjectProvider to supply state
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ProjectProvider>
      <App />
    </ProjectProvider>
  </React.StrictMode>
);
