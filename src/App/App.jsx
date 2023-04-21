import { useState } from "react";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";

//React Components
import NavBar from "../components/NavBar/NavBar";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import NoMatch from "../components/NoMatch/NoMatch";
import SignIn from "../pages/SignIn/SignIn";

export default function App() {
  return (
    <main className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users">
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<SignIn />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
}
