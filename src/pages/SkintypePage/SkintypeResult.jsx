import { useState, useEffect } from "react";
import SkinTypeText from "./SkinTypeText";
import RecommendedProducts from "./RecommendedProducts";

export default function ({ user }) {
  const [skintype, setSkintype] = useState(user);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchSkintype = async () => {
      if (!user) {
        return; // exit early if user is null or undefined
      }
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `/api/skintypes/${user.skintype._id}/member/${user._id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token,
            },
          }
        );
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setSkintype(data);
      } catch (error) {
        setError(error.message);
      }
    };
    fetchSkintype();
  }, [user]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!skintype) {
    return <div>loading</div>;
  }

  return (
    <div className="hero min-h-screen bg-stone-50">
      <div className="flex flex-col justify-center items-center">
        <SkinTypeText skintype={skintype} />
        <RecommendedProducts />
      </div>
    </div>
  );
}
