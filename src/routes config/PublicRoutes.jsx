import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "@/pages/Signup";
import Login from "@/pages/Login";
import { useAuth } from "@/context/auth";

const PublicRoutes = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Routes>
      <Route
        path="/signup"
        element={isLoggedIn ? <Navigate to="/" /> : <Signup />}
      />
      <Route
        path="/login"
        element={isLoggedIn ? <Navigate to="/" /> : <Login />}
      />
    </Routes>
  );
};

export default PublicRoutes;
