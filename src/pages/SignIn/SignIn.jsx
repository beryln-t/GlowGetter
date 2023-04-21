export default function SignIn() {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://i.imgur.com/5xLMlln.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>
        <div className="hero-content flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Sign in now!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Sign In</button>
              </div>
              <div className="divider text-xs">OR</div>
              <div className="form-control mt-0">
                <button className="btn btn-primary">Register an Account</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
