import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllShows from "@/pages/AllShows";
import ShowDetails from "@/pages/ShowDetails";
import { useAuth } from "@/context/auth";

const ProtectedRoutes = () => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? (
    <Routes>
      <Route path="/" element={<AllShows />} />
      <Route path="show/:id" element={<ShowDetails />} />
    </Routes>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
