import React, { useState } from "react";
// @ts-ignore
import HomePageBG from "../../components/HomePageBG/HomePageBG.jpg";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    console.log("Image loaded successfully");
    setLoaded(true);
  };

  const style = {
    backgroundImage: `url(${HomePageBG})`,
    opacity: loaded ? 1 : 0.1, // set opacity to 1 when loaded is true
    transition: "opacity 1s ease-in-out", // add a smooth fade-in transition
  };

  console.log("loaded ", loaded);

  return (
    <div>
      <div className={`hero min-h-screen`} style={style}>
        <img
          src={HomePageBG}
          alt="Image"
          onLoad={handleImageLoad}
          style={{ display: "none" }}
        />
        <div className="hero-overlay bg-opacity-50"></div>
        <div className="hero-content text-center text-neutral-content">
          <div className="max-w-lg">
            <h1 className="mb-5 text-5xl font-bold"> Welcome to GlowGetter!</h1>
            <p className="mb-5 text-lg">
              Achieving glowy skin starts with using the right products for your
              skin type. Our Skin Type Analyser helps you determine your skin
              type, to provide you with personalised product recommendations!
            </p>
            <button className="btn btn-primary">
              Try the Skin Type Analyser
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
