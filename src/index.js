import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Get initial URL path (/ , /admin , /admin/login etc)
const initialPath = window.location.pathname;

root.render(
  <React.StrictMode>
    <App initialPath={initialPath} />
  </React.StrictMode>
);
