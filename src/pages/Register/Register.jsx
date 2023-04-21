import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, signUp } from "../../utilities/users-service";
import { Link } from "react-router-dom";

export default function Registe({ setUser }) {
  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    role: "",
  });

  const navigate = useNavigate();
  const [error, setError] = useState("");

  const isFormFilled = Object.values(state).every((val) => val !== "");
  const disable = state.password !== state.confirm || !isFormFilled;

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signUp(state);
      setUser(getUser());
      navigate("/users/signin");
    } catch (error) {
      if (error.message.includes("email")) {
        setError("This email already has an account");
      } else {
        setError(error.message);
      }
    }
  };

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: `url("https://i.imgur.com/5xLMlln.jpg")`,
        }}
      >
        <div className="hero-overlay bg-opacity-70"></div>

        <div className="hero-content flex-col items-center justify-start">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4 text-white">
              Register an Account!
            </h1>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Name</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    className="input input-bordered"
                    onChange={handleChange}
                    value={state.name}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered"
                    onChange={handleChange}
                    value={state.email}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">
                      Password (4 or more characters)
                    </span>
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="input input-bordered"
                    onChange={handleChange}
                    value={state.password}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    className="input input-bordered"
                    onChange={handleChange}
                    value={state.confirm}
                  />
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Account Type</span>
                  </label>
                  <select
                    name="role"
                    className="select select-bordered"
                    defaultValue=""
                    onChange={handleChange}
                  >
                    <option hidden value="">
                      Select an option
                    </option>
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div className="form-control mt-6">
                  <button
                    className="btn btn-primary btn-caretdown "
                    disabled={disable}
                  >
                    Join Now!
                  </button>
                </div>
              </form>
              <div className="divider text-xs mb-0"></div>
              <div className="text-center ">Already a Member?</div>
              <div className="form-control mt-2">
                <Link to="/users/signin" className="btn btn-primary">
                  Sign In!
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
