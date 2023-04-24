import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, login } from "../../utilities/users-service";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

export default function SignIn({ setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const user = await login(values);
        setUser(user);
        navigate("/");
      } catch {
        setError("Login failed. Try again.");
      }
    },
  });

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
          <form onSubmit={formik.handleSubmit}>
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
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    type="password"
                    className="input input-bordered"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <div className="form-control mt-6">
                  <button className="btn btn-primary" type="submit">
                    Sign In
                  </button>
                </div>
                <div className="divider text-xs">OR</div>
                <div className="form-control mt-0">
                  <Link to="/users/register" className="btn btn-primary">
                    Register an Account
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
