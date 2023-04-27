import { useState, useEffect } from "react";

export default function ({ user, setUser }) {
  const [product, setProduct] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const productId = document.location.pathname.replace(
    "/products/productDetails/",
    ""
  );

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/products/${productId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data) {
        setProduct(data);
        console.log("data ", data);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!user) {
          return;
        }
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/members/${user._id}/wishlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        });
        const data = await response.json();
        setWishlist(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchWishlist();
  }, []);

  const isProductInWishlist = (productId) => {
    return wishlist.some((item) => item._id === productId);
  };

  const addWishlist = async (productId) => {
    try {
      if (isProductInWishlist(productId)) {
        setErrorMessage("Product is already in wishlist.");
        setTimeout(() => {
          setErrorMessage("");
        }, 2000);
        return;
      }
      const token = localStorage.getItem("token");

      const response = await fetch(
        `/api/members/${user._id}/wishlist/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify({ productId }),
        }
      );
      const data = await response.json();
      setWishlist([...wishlist, data]);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    product && (
      <div className="hero min-h-screen bg-stone-50 flex flex-row flex-wrap justify-center items-center p-10">
        <div className="hero-content flex-row flex-wrap items-center justify-center gap-7 w-full">
          {errorMessage && (
            <div className="alert alert-error shadow-lg">{errorMessage}</div>
          )}
          <img
            src={product.imgurl}
            className="max-w-sm rounded-lg shadow-xl "
          />
          <div className="flex-col w-full max-w-2xl min-w-0 p-3 flex-shrink-0 overflow-hidden">
            <div className="flex-col space-y-3">
              <h1 className="text-2xl font-semibold">{product.brand}</h1>
              <h2 className="text-3xl font-thin">{product.productName}</h2>
              <p className="text-2xl font-light">
                {product.price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "SGD",
                })}
              </p>
              <p className="text-xl text-justify font-thin">
                {product.description}
              </p>
              <div className="divider"></div>
              <p className="text-base text-justify font-normal">
                Category: {product.category}
              </p>
              <p className="text-base text-justify font-normal">
                Skintypes:{" "}
                {product.skintypes.map((skintype) => skintype.type).join(", ")}
              </p>
              <div className="divider"></div>
            </div>
            {user && (
              <button
                className={`btn ${
                  isProductInWishlist(product._id)
                    ? "btn-error disabled"
                    : "btn-outline btn-error"
                } gap-2 mt-5`}
                onClick={(e) => {
                  addWishlist(product._id);
                }}
              >
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
                Add to wishlist
              </button>
            )}
          </div>
        </div>
      </div>
    )
  );
}
