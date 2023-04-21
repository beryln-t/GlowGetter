import { useState } from "react";
import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import { getUser } from "../utilities/users-service";

//Components
import NavBar from "../components/NavBar/NavBar";

//pages
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import SkinAnalyser from "../pages/SkinAnalyser/SkinAnalyser";

//error message components
import NoMatch from "../components/NoMatch/NoMatch";
import UnauthorizedError from "../components/UnauthorizedError/UnauthorizedError";

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skinanalyser" element={<SkinAnalyser />} />
        <Route path="users">
          <Route path="register" element={<Register setUser={setUser} />} />
          <Route path="signin" element={<SignIn setUser={setUser} />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
}
