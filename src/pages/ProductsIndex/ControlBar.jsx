export default function ({ onSearchProduct }) {
  return (
    <div className="flex flex-row flex-wrap mb-5 gap-5 justify-start w-full ">
      <div className="flex items-center w-full">
        Search:{" "}
        <input
          className="ml-4 input input-bordered w-full"
          placeholder="Enter product name"
          onChange={onSearchProduct}
        />
      </div>
    </div>
  );
}
