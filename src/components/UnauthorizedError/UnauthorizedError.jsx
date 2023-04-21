export default function UnauthorizedError() {
  return (
    <div className="alert alert-error shadow-lg mx-auto">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="ml-2 text-center ">
          401. That's an error! You are not authorized to access this resource.
          Please provide valid credentials to authenticate yourself and try
          again.
        </span>
      </div>
    </div>
  );
}
