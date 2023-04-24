import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import EditProfileHeader from "./EditProfileHeader";
import { getUser } from "../../utilities/users-service";

export default function ({ user, setUser }) {
  const [editedUser, setEditedUser] = useState(user);

  useEffect(() => {
    setEditedUser(user);
  }, [user]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEditedUser({
      ...editedUser,
      [name]: value,
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/members/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: editedUser.name,
          email: editedUser.email,
        }),
      });
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      // If the API call was successful, update the user state
      //   const updatedUser = await response.json(); // get the updated user from the response
      const updatedUser = await getUser();
      setUser(updatedUser);
      setEditedUser(updatedUser);
      console.log("updatedUser", updatedUser);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    editedUser && (
      <div className="hero min-h-screen bg-stone-50">
        <div className="hero-content flex-col items-center justify-center w-full max-w-xl ">
          <EditProfileHeader />
          <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
            <div className="card-body text-slate-800 flex-auto ">
              <form onSubmit={handleSave}>
                <div className="mb-5">
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Name:
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full flex-1"
                    value={editedUser.name}
                    name="name"
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Email:
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full flex-1"
                    value={editedUser.email}
                    name="email"
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Skin type:
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full flex-1"
                    value={editedUser.skintype}
                    name="skintype"
                    onChange={handleChange}
                    placeholder={
                      editedUser.skintype
                        ? undefined
                        : "No skin type recorded. Take analyser to determine skin type"
                    }
                    disabled
                  />
                </div>
                <NavLink to="/skinanalyser" className="link link-primary mb-5">
                  Click here to take / update Skin Type Analyser
                </NavLink>

                <div className="form-control mt-5 flex flex-row gap-2">
                  <button className="btn btn-primary btn w-min w-24">
                    Save
                  </button>
                  <button className="btn btn-secondary btn w-min w-24">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
