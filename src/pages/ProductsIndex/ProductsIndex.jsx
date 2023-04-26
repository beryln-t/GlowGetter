import { Outlet } from "react-router-dom";
import ControlBar from "./ControlBar";

export default function () {
  return (
    <div className="hero min-h-screen bg-stone-50  flex justify-center items-start p-5">
      <div className="flex flex-col items-center p-5">
        <ControlBar />
        <div className="flex flex-row flex-wrap max-w-custom gap-5 justify-start ">
          <div className="card flex flex-col bg-base-100 shadow-xl w-80 p-5 hover:scale-105">
            <div className="flex flex-col items-center relative">
              <button className="btn btn-circle btn-outline btn-error absolute left-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
              <img
                src="https://i.imgur.com/raYTKqT.jpg"
                alt="Shoes"
                className="w-2/3 h-auto"
              />
              <div className="flex flex-col justify-start w-full">
                <p className="text-base font-extrabold leading-7">brand</p>
                <p className="text-sm leading-7 truncate">
                  Perfectionist Pro Multi-Defense UV Fluid SPF 45 PA++++
                </p>
                <p className="text-sm font-semibold leading-7	">product price</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
