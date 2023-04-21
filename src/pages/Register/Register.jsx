import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUser, signUp } from "../../utilities/users-service";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  name: yup
    .string()
    .required("Please enter a name")
    .max(100, "Name is too long"),
  email: yup
    .string()
    .email("Please enter a valid email")
    .max(150, "Email is too long")
    .required("Please enter an email"),
  password: yup
    .string()
    .min(4, "Password must be at least 4 characters")
    .max(30, "Password is too long")
    .required("Please enter a password"),
  confirm: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
  role: yup
    .string()
    .oneOf(["Member", "Admin"], "Invalid user role")
    .required("Please select a user role"),
});

export default function Register({ user, setUser }) {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirm: "",
      role: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await signUp(values);
        setUser(getUser());
        navigate("/users/signin");
      } catch (error) {
        if (error.message.includes("email")) {
          setError("This email already has an account");
        } else {
          setError(error.message);
        }
      }
    },
  });

  const handleChange = (event) => {
    formik.handleChange(event);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = await formik.validateForm();
    if (isValid) {
      formik.handleSubmit();
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.name}
                  />
                  {formik.touched.name && formik.errors.name ? (
                    <div className="text-red-500">{formik.errors.name}</div>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="input input-bordered"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-red-500">{formik.errors.email}</div>
                  ) : null}
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
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-red-500">{formik.errors.password}</div>
                  ) : null}
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Confirm Password</span>
                  </label>
                  <input
                    type="password"
                    name="confirm"
                    className="input input-bordered"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.confirm}
                  />
                  {formik.touched.confirm && formik.errors.confirm ? (
                    <div className="text-red-500">{formik.errors.confirm}</div>
                  ) : null}
                </div>
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Account Type</span>
                  </label>
                  <select
                    name="role"
                    className="select select-bordered"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.role}
                  >
                    <option hidden value="">
                      Select an option
                    </option>
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>
                  {formik.touched.role && formik.errors.role ? (
                    <div className="text-red-500">{formik.errors.role}</div>
                  ) : null}
                </div>
                {error && <div className="text-red-500">{error}</div>}
                <div className="form-control mt-6">
                  <button className="btn btn-primary btn-caretdown ">
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
