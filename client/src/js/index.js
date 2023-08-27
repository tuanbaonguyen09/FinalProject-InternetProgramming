import * as React from "react";
import * as ReactDOM from "react-dom/client";

import { LoadingProvider } from "../context/LoadingContext.jsx";

import App from "./App";
import "../scss/index.scss";

const root = ReactDOM.createRoot(document.getElementById("app"));
root.render(
      <LoadingProvider>
      <App/>
      </LoadingProvider>
);