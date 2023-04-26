import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { logOut } from "../../utilities/users-service";
import { useNavigate, NavLink } from "react-router-dom";
import { CustomEvents } from "../../utilities/CustomEvents";

export default function PostSignInNB({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    logOut();
    setUser(null);
    document.dispatchEvent(new CustomEvent(CustomEvents.ShowLogoutAlert));
    navigate("/");
  };

  const getNavLink = isNaN(user.analyserScore)
    ? "/skinanalyser"
    : `/member/skintype/${user.skintype._id}`;

  return (
    <div className="navbar-end max-w-full	text-slate-700	">
      <div className="flex items-stretch">
        {!!user && (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost rounded-btn ">
              <div className="font-weight: 800">
                Hello,{" "}
                <span className="italic font-weight: 900;">{user.name}</span>
              </div>
              <FiChevronDown className="w-4 h-4 ml-2" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
            >
              {user && user.role === "Admin" ? (
                <li>
                  <a>Product Inventory</a>
                </li>
              ) : (
                <div>
                  <li>
                    <NavLink to="/member/myprofile">My Profile</NavLink>
                  </li>
                  <li>
                    <NavLink to="/member/wishlist">My Wishlist</NavLink>
                  </li>
                  <li>
                    <NavLink to={getNavLink}>My Skin Type</NavLink>
                  </li>
                </div>
              )}
              <div className="divider mt-0 mb-0 "></div>
              <li>
                <a onClick={handleLogOut}>Sign Out</a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
