import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./my.css"
import "./index.css";
import { BrowserRouter } from "react-router-dom";

const root_cont = document.getElementById("root");

const root = createRoot(root_cont);
root.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>
);