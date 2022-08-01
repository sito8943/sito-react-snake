import React from "react";
import ReactDOM from "react-dom/client";

// App
import App from "./App";

// styles
import "./index.css";

// contexts
import { LanguageProvider } from "./contexts/LanguageProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </React.StrictMode>
);
