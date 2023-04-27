import { useEffect, useState } from "react";
import { Routes, Route } from "react-router";
import { getUser } from "../utilities/users-service";
import React from "react";

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
import UnauthorizedError from "../components/UnauthorizedError/UnauthorizedError";
import TakeAnalyserPrompt from "../components/TakeAnalyserPrompt/TakeAnalyserPrompt";

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
          path="/products/index"
          element={<ProductsIndex user={user} setUser={setUser} />}
        />
        <Route
          path="/products/productdetails/:productId"
          element={<ProductDetails user={user} setUser={setUser} />}
        />
        <Route
          path="/users/register"
          element={<Register user={user} setUser={setUser} />}
        />
        <Route path="/users/signin" element={<SignIn setUser={setUser} />} />

        {user ? (
          <React.Fragment>
            <Route
              path="/skinanalyser"
              element={<SkinAnalyser user={user} setUser={setUser} />}
            />
            <Route
              path="/member/myprofile"
              element={<MyProfile user={user} />}
            />
            <Route
              path="/member/editprofile"
              element={<EditProfile user={user} setUser={setUser} />}
            />
            <Route
              path="/member/wishlist"
              element={<WishlistIndex user={user} setUser={setUser} />}
            />
            {user.analyserScore ? (
              <Route
                path="/member/skintype/:userskintypeID"
                element={<SkintypeResult user={user} />}
              />
            ) : (
              <Route
                path="/member/skintype/:userskintypeID"
                element={<TakeAnalyserPrompt />}
              />
            )}
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Route path="/member/*" element={<UnauthorizedError />} />
            <Route path="/skinanalyser" element={<UnauthorizedError />} />
            <Route path="/member/myprofile" element={<UnauthorizedError />} />
            <Route path="/member/editprofile" element={<UnauthorizedError />} />
            <Route path="/member/wishlist" element={<UnauthorizedError />} />
            <Route
              path="/member/skintype/:userskintypeID"
              element={<UnauthorizedError />}
            />
          </React.Fragment>
        )}

        <Route path="/*" element={<NoMatch />} />
      </Routes>
    </main>
  );
}
