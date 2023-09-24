import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/Auth/AuthContext.jsx";
import { ToastContextProvider } from "./context/Toast/ToastContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastContextProvider>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </ToastContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
