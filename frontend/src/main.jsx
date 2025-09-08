import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Shortener from "./pages/Shortener";
import Stats from "./pages/Stats";
import Redirect from "./pages/Redirect";
import "./styles/style.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Shortener />} />
          <Route path="stats" element={<Stats />} />
          <Route path=":code" element={<Redirect />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
