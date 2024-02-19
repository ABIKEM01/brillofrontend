import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import HomeLayout from "./components/layout/HomeLayout.tsx";
// import Login from "./pages/auth/Login.js";
// import Login from "./pages/auth/Login.js";
import Signin from "./pages/auth/Signin.js";
import Register from "./pages/auth/Register.js";
import ForgotPasswordForm from "./pages/auth/forget-password.tsx";
import Overview from "./pages/home/overview.tsx";
import Hero from "./components/hero/hero.tsx";
import Discover from "./pages/home/discover.tsx";
import Settings from "./pages/home/settings.tsx";

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Signin />} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forget-password" element={<ForgotPasswordForm />} />
      <Route path="/discover" element={<Discover />} />
      <Route path="/overview" element={<Overview />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default Router;
