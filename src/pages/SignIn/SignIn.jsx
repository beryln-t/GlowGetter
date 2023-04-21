import { useState } from "react";
import { getUser, login } from "../../utilities/users-service";
import { useNavigate } from "react-router-dom";

export default function SignIn({ setUser }) {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleChange(evt) {
    setCredentials({ ...credentials, [evt.target.name]: evt.target.value });
    setError("");
  }

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const user = await login(credentials);
      setUser(getUser());
      navigate("/");
    } catch {
      setError("Login failed. Try again.");
    }
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
        <div className="hero-content flex-col items-center justify-center">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-white mb-4">Sign in now!</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
              <div className="card-body">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered"
                    name="email"
                    value={credentials.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    className="input input-bordered"
                    name="password"
                    value={credentials.password}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Sign In
                  </button>
                </div>
                <div className="divider text-xs">OR</div>
                <div className="form-control mt-0">
                  <button
                    className="btn btn-primary"
                    onClick={() => navigate("/users/register")}
                  >
                    Register an Account
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
