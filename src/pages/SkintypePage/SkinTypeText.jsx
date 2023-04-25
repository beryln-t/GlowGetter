import React from "react";

export default function ({ skintype }) {
  return (
    <div>
      <div className="text-center text-slate-800 max-w-5xl">
        <h1 className="text-4xl font-bold">
          Your Skin type is: <span className="italic">{skintype.type}</span>
        </h1>
        <p className="pt-6 mb-0 text-justify">{skintype.message}</p>
        <div className="divider"></div>
      </div>
    </div>
  );
}
