import React, { useContext } from "react";
import { NavbarSimple } from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import ToastContainer from "./components/Toast/ToastContainer";
import { AuthContext } from "./context/Auth/AuthContext";
import RecordsPage from "./pages/RecordsPage";
import HomePage from "./pages/HomePage";
const App = () => {
  const { state } = useContext(AuthContext);
  console.log(state?.token ? "Loggedin " : "Not logged in");
  return (
    <div>
      <NavbarSimple />
      <Routes>
        <Route
          path="/"
          element={state?.token ? <RecordsPage/> : <HomePage />}
        />
        <Route
          path="/login"
          element={state?.token ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/signup"
          element={state?.token ? <Navigate to="/" /> : <SignupPage />}
        />
      </Routes>
      <ToastContainer />
    </div>
  );
};

export default App;
