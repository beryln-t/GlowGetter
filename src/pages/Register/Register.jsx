export default function Register() {
  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col items-center justify-start">
          <div className="text-center">
            <h1 className="text-5xl font-bold  mb-4">Register an Account!</h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Password (4 or more characters)
                  </span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input type="text" className="input input-bordered" />
              </div>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Account Type</span>
                </label>
                <select className="select select-bordered">
                  <option disabled selected>
                    Select an option
                  </option>
                  <option>Member</option>
                  <option>Admin</option>
                </select>
              </div>

              <div className="form-control mt-6">
                <button className="btn btn-primary">Join Now!</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
