import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom.min";
import ContextProvider from "./Context/ContextProvider.js";
import App from "./App";
import "./App.css";
import 'animate.css';
import "./Spinner.css";

ReactDOM.render(
  <ContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ContextProvider>,
  document.getElementById("root")
);
