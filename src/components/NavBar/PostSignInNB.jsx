import React from "react";
import { FiChevronDown } from "react-icons/fi";
import { logOut } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function PostSignInNB({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogOut = (e) => {
    e.preventDefault();
    logOut();
    setUser(null);
    navigate("/");
  };
  return (
    <div className="navbar-end">
      <div className="flex items-stretch">
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
            {user.role === "Admin" ? (
              <li>
                <a>Product Inventory</a>
              </li>
            ) : (
              <div>
                <li>
                  <a>My Profile</a>
                </li>
                <li>
                  <a>My Wishlist</a>
                </li>
                <li>
                  <a>My Reviews</a>
                </li>
              </div>
            )}
            <div className="divider mt-0 mb-0 "></div>
            <li>
              <a onClick={handleLogOut}>Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
