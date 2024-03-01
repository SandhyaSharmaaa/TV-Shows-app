import React from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import PublicRoutes from "@/routes config/PublicRoutes";
import ProtectedRoutes from "@/routes config/ProtectedRoutes";
import { AuthProvider } from "@/context/auth";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<ProtectedRoutes />} />
          <Route path="/*" element={<PublicRoutes />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
