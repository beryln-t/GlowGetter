import WishlistHeader from "./WishlistHeader";
import HeaderControllers from "./HeaderControllers";

export default function () {
  return (
    <div className="hero min-h-screen bg-stone-50 flex justify-center items-start p-5">
      <div className="flex-col items-center space-y-3">
        <WishlistHeader />
        <div className="divider m-0" />
        <HeaderControllers />
        <div className="overflow-x-scrolls w-full max-w-5xl">
          <table className="table w-full table-fixed">
            <tbody>
              <tr className="h-48 hover">
                <td className="w-14	">
                  <label>
                    <input type="checkbox" className="checkbox checkbox-xs" />
                  </label>
                </td>
                <td>
                  <div className="flex items-center justify-center">
                    <div className="avatar">
                      <div className="mask w-30 h-30">
                        <img
                          src="https://i.imgur.com/raYTKqT.jpg"
                          alt="image"
                        />
                      </div>
                    </div>
                  </div>
                </td>
                <td className="w-1/2 space-y-3 ">
                  <div className="font-bold text-base">brand</div>
                  <div className="text-2xl font-normal truncate">name</div>
                  <div className="text-xl font-light">price</div>
                </td>
                <td className="space-y-3">
                  <div>
                    <button className="btn btn-outline btn-xs btn-primary w-full text-xs ">
                      Details
                    </button>
                  </div>
                  <div>
                    <button className="btn btn-error btn-xs w-full text-xs">
                      Remove
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
