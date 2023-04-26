import { useState, useEffect } from "react";
import SkinTypeText from "./SkinTypeText";
import RecommendedProducts from "./RecommendedProducts";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function ({ user }) {
  const [skintype, setSkintype] = useState(user);
  const [error, setError] = useState();
  const [products, setProducts] = useState();
  const token = localStorage.getItem("token");
  useEffect(() => {
    const fetchSkintype = async () => {
      if (!user) {
        return; // exit early if user is null or undefined
      }
      try {
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

    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, [user]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`/api/recommendations/${skintype._id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setProducts(data);
      } catch (e) {
        setError(e.message);
      }
    };
    if (skintype?._id) {
      fetchProducts();
    }
  }, [skintype]);

  if (error) {
    return <div>{error}</div>;
  }
  if (!skintype) {
    return <LoadingSpinner />;
  }

  return (
    <div className="hero min-h-screen bg-stone-50 flex justify-center items-start p-5">
      <div className="flex flex-col items-center">
        <SkinTypeText skintype={skintype} />

        <div className="flex flex-row flex-wrap my-4 ml-auto gap-5">
          <div className="flex items-center">
            <label className="text-sm">Sort:</label>
            <select className="select select-bordered select-xs max-w-xs">
              <option hidden>Select an option</option>
              <option>All Products</option>
              <option>Low to High</option>
              <option>High to Low</option>
            </select>
          </div>
          <div className="flex items-center ">
            <label className="text-sm">Category:</label>
            <select className="select select-bordered select-xs max-w-xs">
              <option hidden>Select an option</option>
              <option>All Product</option>
              <option>Cleansers</option>
              <option>Moisturisers</option>
              <option>Sunscreens</option>
            </select>
          </div>
        </div>
        <RecommendedProducts products={products} />
      </div>
    </div>
  );
}
