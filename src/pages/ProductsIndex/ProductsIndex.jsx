import { useNavigate } from "react-router-dom";
import ControlBar from "./ControlBar";
import { useState, useEffect } from "react";
import { debounce } from "../../utilities/products-utility";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function ({ user, setUser }) {
  const [loading, setLoading] = useState(false);
  const [wishlist, setWishlist] = useState([]);
  const [products, setProducts] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  const [conditions, setConditions] = useState({
    productName: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const updatedConditions = Object.keys(conditions).reduce(
        (prev, key) =>
          conditions[key]
            ? {
                ...prev,
                [key]: conditions[key],
              }
            : {
                ...prev,
              },
        {}
      );
      const params = new URLSearchParams({ ...updatedConditions });
      const getParamsLink = Object.keys(updatedConditions).length
        ? `?${params.toString()}`
        : "";
      const response = await fetch(`/api/products${getParamsLink}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      if (data) {
        setProducts(data);
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };
    fetchProducts();
  }, [conditions]);

  const onSearchProduct = debounce((e) => {
    const value = e.target.value;
    setConditions((prevState) => ({
      ...prevState,
      productName: value,
    }));

    // create a new URLSearchParams object with the updated search params
    const params = new URLSearchParams();
    if (value) {
      params.set("productName", value);
    }

    // update the URL with the new search params
    navigate({ search: params.toString() ? "?" + params.toString() : "" });
  }, 300);

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        if (!user) {
          return;
        }
        const response = await fetch(`/api/members/${user._id}/wishlist`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
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
      const response = await fetch(
        `/api/members/${user._id}/wishlist/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
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
    <div className="hero min-h-screen bg-stone-50 flex justify-center items-start p-5">
      <div className="flex flex-col items-center p-5">
        <div className="max-w-xl w-full">
          <ControlBar onSearchProduct={onSearchProduct} />
        </div>
        {errorMessage && (
          <div className="alert alert-error shadow-lg">{errorMessage}</div>
        )}
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className="flex flex-row flex-wrap max-w-custom gap-5 justify-start cursor-pointer">
            {products.length ? (
              products.map((product) => (
                <div
                  key={product._id}
                  className="card flex flex-col bg-base-100 shadow-xl w-80 p-5 hover:scale-105"
                  onClick={() => {
                    navigate(`/products/productDetails/${product._id}`);
                  }}
                >
                  <div className="flex flex-col items-center relative">
                    {user && (
                      <button
                        className={`btn btn-circle ${
                          isProductInWishlist(product._id)
                            ? "btn-error disabled"
                            : "btn-outline btn-error"
                        } absolute left-0`}
                        onClick={(e) => {
                          e.stopPropagation();
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
                      </button>
                    )}
                    <img
                      src={product.imgurl}
                      alt="Shoes"
                      className="w-2/3 h-auto"
                    />
                    <div className="flex flex-col justify-start w-full">
                      <p className="text-base font-extrabold leading-7	">
                        {product.brand}
                      </p>
                      <p className="text-sm leading-7 truncate">
                        {product.productName}
                      </p>
                      <p className="text-sm font-semibold leading-7	">
                        {product.price.toLocaleString("en-US", {
                          style: "currency",
                          currency: "SGD",
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="cursor-text"> No products found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}