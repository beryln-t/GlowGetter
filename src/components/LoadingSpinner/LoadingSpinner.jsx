import React from "react";
import { FaSpinner } from "react-icons/fa";

export default function LoadingSpinner() {
  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
      style={{ zIndex: 9999 }}
    >
      <FaSpinner className="animate-spin text-4xl text-gray-500" />
      <div className="text-lg font-bold mt-5">Loading</div>
    </div>
  );
}
