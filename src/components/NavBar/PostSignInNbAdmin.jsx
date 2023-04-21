import React from "react";
import { FiChevronDown } from "react-icons/fi";

export default function PostSignInNbAdmin() {
  return (
    <div className="navbar-end">
      <div className="flex items-stretch">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost rounded-btn ">
            <div className="font-weight: 800">
              Hello, <span className="italic">Name</span>
            </div>
            <FiChevronDown className="w-4 h-4 ml-2" />{" "}
          </label>
          <ul
            tabIndex={0}
            className="menu dropdown-content p-2 shadow bg-base-100 rounded-box w-52 mt-4"
          >
            <li>
              <a>Product Inventory</a>
            </li>
            <div className="divider mt-0 mb-0 "></div>
            <li>
              <a>Sign Out</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
