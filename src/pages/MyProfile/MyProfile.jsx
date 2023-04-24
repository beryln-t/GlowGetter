import React from "react";
import { NavLink } from "react-router-dom";
import ProfileHeader from "./ProfileHeader";

export default function ({ user, setUser }) {
  return (
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
                  value={user.name}
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
                  value={user.email}
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
                  value={user.skintype}
                  disabled
                  placeholder={
                    user.skintype
                      ? undefined
                      : "No skintype recorded. Take analyser to find skin type"
                  }
                />
              </div>
              <div className="form-control mt-4 flex flex-row gap-2">
                <button className="btn btn-primary btn w-min w-24">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
