export default function ({ onSearchProduct }) {
  return (
    <div className="flex flex-row flex-wrap mb-5 ml-auto gap-5 justify-between w-full">
      <div className="flex ">
        <div className="flex items-center">
          Search:{" "}
          <input
            className="ml-1"
            placeholder="Enter product name..."
            onChange={onSearchProduct}
          />
        </div>
      </div>
      <div className="flex">
        <div className="flex items-center">
          <label className="text-sm">Sort:</label>
          <select className="select select-bordered select-xs max-w-xs mx-1">
            <option hidden>Select an option</option>
            <option>All Products</option>
            <option>Low to High</option>
            <option>High to Low</option>
          </select>
        </div>
        <div className="flex">
          <div className="flex items-center ">
            <label className="text-sm">Category:</label>
            <select className="select select-bordered select-xs max-w-xs mx-1">
              <option hidden>Select an option</option>
              <option>All Product</option>
              <option>Cleansers</option>
              <option>Moisturisers</option>
              <option>Sunscreens</option>
            </select>
          </div>
          <div className="flex items-center ">
            <label className="text-sm">Skin Type:</label>
            <select className="select select-bordered select-xs max-w-xs ml-1">
              <option hidden>Select an option</option>
              <option>Dry</option>
              <option>Oily</option>
              <option>Normal</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
