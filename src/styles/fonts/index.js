import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

import GlobalStyle from "./GlobalStyle";
import { ThemeProvider } from "styled-components";
import theme from "./Theme.js";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
