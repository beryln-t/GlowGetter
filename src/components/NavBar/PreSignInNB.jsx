import React from "react";
import { NavLink } from "react-router-dom";

export default function PreSignIn() {
  return (
    <div className="navbar-end">
      <NavLink
        className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md"
        to="/users/signin"
      >
        Sign In
      </NavLink>
      <div className="divider divider-horizontal"></div>
      <NavLink
        className="btn btn-outline btn-primary btn-xs sm:btn-sm md:btn-md"
        to="/users/register"
      >
        Register
      </NavLink>
    </div>
  );
}
