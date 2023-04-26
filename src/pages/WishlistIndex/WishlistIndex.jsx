import WishlistHeader from "./WishlistHeader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

export default function ({ user, product }) {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true); // Add new state variable for loading
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
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
      if (data) {
        setWishlist(data);
        setLoading(false);
      }
    };
    fetchWishlist();
  }, [user]);

  const handleRowClick = (productId) => {
    navigate(`/products/productDetails/${productId}`);
  };

  const handleRemoveClick = async (productId) => {
    const response = await fetch(
      `/api/members/${user._id}/wishlist/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.ok) {
      setWishlist(wishlist.filter((item) => item._id !== productId));
    }
    fetchWishlist();
  };

  return (
    <div className="hero min-h-screen bg-stone-50 flex justify-center items-start p-5">
      <div className="flex-col items-center space-y-3">
        <WishlistHeader />

        <div className="divider m-0" />
        {loading ? (
          <LoadingSpinner />
        ) : wishlist.length === 0 ? (
          <div className="text-xl text-red-600">
            No products in wishlist. Browse products to add items!
          </div>
        ) : (
          <div className="overflow-x-scrolls w-full max-w-5xl">
            <table className="table w-full table-fixed">
              <tbody>
                {wishlist.map((item) => (
                  <tr key={item._id} className="h-48 hover">
                    <td>
                      <div className="flex items-center justify-center">
                        <div className="avatar">
                          <div className="mask w-30 h-30">
                            <img src={item.imgurl} alt={item.name} />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="w-1/2 space-y-3 ">
                      <div className="font-bold text-base">{item.brand}</div>
                      <div className="text-2xl font-normal truncate">
                        {item.productName}
                      </div>
                      <div className="text-xl font-light">{item.price}</div>
                    </td>
                    <td className="space-y-3">
                      <div>
                        <button
                          className="btn btn-outline btn-primary w-full text-xs "
                          onClick={() => handleRowClick(item._id)}
                        >
                          Details
                        </button>
                      </div>
                      <div>
                        <button
                          className="btn btn-error  w-full text-xs"
                          onClick={() => handleRemoveClick(item._id)}
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
