import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "./store/auth-context";

const App = () => {
  const { token } = useAuth();
  
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          {" "}
          <Route path="/" element={token ? <Home /> : <Home />} />
          <Route path="/login" element={!token ? <Login /> : <NotFound />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
