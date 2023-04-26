export default function () {
  return (
    <div>
      <div className="flex flex-row flex-wrap ml-auto gap-5">
        <div className="flex items-center space-x-2">
          <input type="checkbox" className="checkbox checkbox-xs" />
          <label className="text-sm">Select all</label>
        </div>
        <button className="btn btn-outline btn-xs btn-error">
          Remove Selected
        </button>
      </div>
    </div>
  );
}
