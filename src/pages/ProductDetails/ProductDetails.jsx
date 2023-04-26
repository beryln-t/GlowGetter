export default function () {
  return (
    <div className="hero min-h-screen bg-stone-50 flex flex-row flex-wrap justify-center items-center p-10">
      <div className="hero-content flex-row flex-wrap items-center justify-center gap-7">
        <img
          src="https://i.imgur.com/raYTKqT.jpg"
          className="max-w-sm rounded-lg shadow-xl "
        />
        <div className="flex-col w-full max-w-2xl min-w-0 p-3 flex-shrink-0 overflow-hidden">
          <div className="flex-col space-y-3">
            <h1 className="text-2xl font-semibold">Brand</h1>
            <h2 className="text-3xl font-thin">
              Perfectionist Pro Multi-Defense UV Fluid SPF 45 PA++++
            </h2>
            <p className="text-2xl font-light">price</p>
            <p className="text-xl text-justify font-thin">
              A superb creamy sunscreen with Adaptable Innershield Technology
              that supports the skin’s natural protective abilities and
              powerfully defends against the sun’s damaging rays, selectively
              allowing the latent benefits of red light in sunlight to pass
              through to the skin.
            </p>
            <div className="divider"></div>
            <p className="text-base text-justify font-normal">Category:</p>
            <p className="text-base text-justify font-normal">Skintypes:</p>
            <div className="divider"></div>
          </div>

          <button className="btn btn-outline btn-error gap-2 mt-5">
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
        </div>
      </div>
    </div>
  );
}
