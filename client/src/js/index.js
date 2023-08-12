import * as React from "react";
import * as ReactDOM from "react-dom/client";


import App from "./App";
import "../scss/index.scss";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
      <React.StrictMode>
           <App/>
      </React.StrictMode>
);