import React, { StrictMode, useContext } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import { AuthProvider, AuthContext } from "./context/AuthContext.jsx";

/* 🔐 Protected Route */
const ProtectedRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? children : <Navigate to="/login" replace />;
};
/* 🌐 Public Route (block after login) */
const PublicRoute = ({ children }) => {
  const { token } = useContext(AuthContext);

  return token ? <Navigate to="/" replace /> : children;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* 🔐 Protected */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <App />
              </ProtectedRoute>
            }
          >
            {/* here you can add new routes */}
            {/* <Route path="/dashboard" element={<Dashboard />} />
  <Route path="/profile" element={<Profile />} /> */}
          </Route>

          {/* 🌐 Public (Blocked if logged in) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
