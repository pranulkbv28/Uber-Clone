import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CaptainSignup from "./pages/CaptainSignup";
import CaptainLogin from "./pages/CaptainLogin";
import UserSignup from "./pages/UserSignup";
import UserLogin from "./pages/UserLogin";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" index element={<Home />} />
        <Route path="/user-login" index element={<UserLogin />} />
        <Route path="/user-signup" index element={<UserSignup />} />
        <Route path="/captain-login" index element={<CaptainLogin />} />
        <Route path="/captain-signup" index element={<CaptainSignup />} />
      </Routes>
    </div>
  );
};

export default App;
