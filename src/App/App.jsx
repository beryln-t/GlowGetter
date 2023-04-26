import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { getUser } from "../utilities/users-service";

//Components
import NavBar from "../components/NavBar/NavBar";
import LogOutAlert from "../components/LogOutAlert/LogOutALert";

//pages
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import SignIn from "../pages/SignIn/SignIn";
import SkinAnalyser from "../pages/SkinAnalyser/SkinAnalyser";
import MyProfile from "../pages/MyProfile/MyProfile";
import EditProfile from "../pages/EditProfile/EditProfile";
import SkintypeResult from "../pages/SkintypePage/SkintypeResult";
import ProductsIndex from "../pages/ProductsIndex/ProductsIndex";
import ProductDetails from "../pages/ProductDetails/ProductDetails";
import WishlistIndex from "../pages/WishlistIndex/WishlistIndex";

// error message components
import NoMatch from "../components/NoMatch/NoMatch";

//others
import { CustomEvents } from "../utilities/CustomEvents";

export default function App() {
  const [user, setUser] = useState(null);
  const [logoutAlertVisible, setLogoutAlertVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  const onShowLogoutAlert = () => {
    setLogoutAlertVisible(true);
    setTimeout(() => setLogoutAlertVisible(false), 3000);
  };

  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      setUser(user);
      console.log("fetch user ", user);

      setLoading(false);
      return user;
    }
    document.addEventListener(CustomEvents.ShowLogoutAlert, onShowLogoutAlert);
    fetchData();

    return () =>
      document.removeEventListener(
        CustomEvents.ShowLogoutAlert,
        onShowLogoutAlert
      );
  }, []);

  return (
    <main className="App">
      <NavBar user={user} setUser={setUser} loading={loading} />
      {logoutAlertVisible && <LogOutAlert />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="skinanalyser"
          element={<SkinAnalyser user={user} setUser={setUser} />}
        />
        <Route path="products">
          <Route path="index" element={<ProductsIndex />} />
          <Route path="test" element={<ProductDetails />} />
          <Route path="*" element={<NoMatch />} />
        </Route>

        <Route path="member">
          <Route path="myprofile" element={<MyProfile user={user} />} />
          <Route
            path="skintype/:userskintypeID"
            element={<SkintypeResult user={user} />}
          />
          <Route
            path="editprofile"
            element={<EditProfile user={user} setUser={setUser} />}
          />
          <Route path="wishlist" element={<WishlistIndex />} />
          <Route path="*" element={<NoMatch />} />
        </Route>
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
