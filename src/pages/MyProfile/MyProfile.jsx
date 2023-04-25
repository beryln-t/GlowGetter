import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

export default function ({ user }) {
  const [userProfile, setUserProfile] = useState(user);

  useEffect(() => {
    setUserProfile(user);
  }, [user]);

  return (
    userProfile && (
      <div className="hero min-h-screen bg-stone-50">
        <div className="hero-content flex-col items-center justify-center w-full max-w-xl ">
          <ProfileHeader />
          <div className="card flex-shrink-0 w-full max-w-3xl shadow-2xl bg-base-100">
            <div className="card-body text-slate-800 flex-auto">
              <form>
                <div>
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Name:
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full flex-1 italic"
                    value={userProfile.name}
                    disabled
                  />
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-lg font-semibold">
                      Email:
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full flex-1 italic"
                    value={userProfile.email}
                    disabled
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
                    value={
                      userProfile.skintype ? userProfile.skintype.type : ""
                    }
                    disabled
                    placeholder={
                      userProfile.skintype
                        ? undefined
                        : "No skin type recorded. Take analyser to determine skin type"
                    }
                  />
                </div>
                <div className="form-control mt-4 flex flex-row gap-2">
                  <NavLink
                    to="/member/editprofile"
                    className="btn btn-primary btn w-min w-24"
                  >
                    Update
                  </NavLink>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
