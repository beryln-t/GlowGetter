import React, { useEffect } from "react";
import { Link, useNavigate, NavLink } from "react-router-dom";
import PreSignInNB from "./PreSignInNB";
import PostSignInNB from "./PostSignInNB";

export default function NavBar({ user, setUser }) {
  console.log(user);
  const navigate = useNavigate();

  return (
    <div className="navbar sticky top-0 z-50 bg-neutral-content">
      <div className="navbar-start">
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <a className="justify-between"> Skin Type Analyser</a>
            </li>
            <li>
              <a>Browse Products</a>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost normal-case text-xl">GlowGetter</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li tabIndex={0}>
            <a>Skin Type Analyser</a>
          </li>
          <li>
            <a>Browse Products</a>
          </li>
        </ul>
      </div>
      {user ? <PostSignInNB user={user} setUser={setUser} /> : <PreSignInNB />}
    </div>
  );
}
