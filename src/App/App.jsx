import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { getUser } from "../utilities/users-service";

//Components
import NavBar from "../components/NavBar/NavBar";
import LogOutAlert from "../components/LogOutAlert/LogOutALert";

//pages
import Home from "../pages/Home/Home";
import SignIn from "../pages/SignIn/SignIn";
import SkinAnalyser from "../pages/SkinAnalyser/SkinAnalyser";

//error message components
// import NoMatch from "../components/NoMatch/NoMatch";

//others
import { CustomEvents } from "../utilities/CustomEvents";
import NoMatch from "../components/NoMatch/NoMatch";
import Register from "../pages/Register/Register";

export default function App() {
  const [user, setUser] = useState(getUser());
  const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);

  const onShowLogoutAlert = () => {
    setLogoutAlertVisible(true);
    setTimeout(() => setLogoutAlertVisible(false), 1000);
  };

  useEffect(() => {
    onShowLogoutAlert();
    document.addEventListener(CustomEvents.ShowLogoutAlert, onShowLogoutAlert);
    return () =>
      document.removeEventListener(
        CustomEvents.ShowLogoutAlert,
        onShowLogoutAlert
      );
  }, []);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} />
      {logoutAlertVisible && <LogOutAlert />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skinanalyser" element={<SkinAnalyser />} />
        <Route path="users">
          <Route
            path="register"
            element={<Register user={user} setUser={setUser} />}
          />
          <Route path="signin" element={<SignIn setUser={setUser} />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </main>
  );
}
