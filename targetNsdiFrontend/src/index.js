import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { DarkModeContextProvider } from "./context/darkModeContext";

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      {/* <BrowserRouter> */}
      <App />
      {/* </BrowserRouter> */}
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
