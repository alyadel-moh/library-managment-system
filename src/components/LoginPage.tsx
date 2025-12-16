import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useLoginUser from "../hooks/useLoginuser";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useGetUser from "../hooks/useGetusers";
const schema = z.object({
  username: z.string().min(1, { message: "UserName is required" }),
  password: z.string().min(1, { message: "Password  is required" }),
});
type formdata = z.infer<typeof schema>; // infers input types (name and age) based on schema
const Form = () => {
  const navigate = useNavigate();

  const headingStyle: CSSProperties = {
    marginBottom: "40px",
    textAlign: "center",
    fontSize: "2.5em",
    whiteSpace: "nowrap",
    marginLeft: "-60px",
  };
  const {
    register,
    handleSubmit,
    formState: { errors }, // is valid for disabelling submit buttton and formsate used for displaying error messages
  } = useForm<formdata>({ resolver: zodResolver(schema) }); // manage form state errors validations submissionhandling i mean it builds and validate form
  const loginuser = useLoginUser();
  const { isPending, isSuccess, isError, error, data } = loginuser;
  const { refetch } = useGetUser();

  // Navigate based on user role after successful login
  useEffect(() => {
    if (isSuccess && data?.token) {
      // Refetch user data after login to get role
      refetch().then((result) => {
        if (result.data?.role) {
          console.log("Navigating for role:", result.data.role);
          if (result.data.role === "ROLE_ADMIN") {
            navigate("/admin/dashboard");
          } else if (result.data.role === "ROLE_CUSTOMER") {
            navigate("/customer/dashboard");
          }
        }
      });
    }
  }, [isSuccess, data, refetch, navigate]);

  return (
    <form
      onSubmit={handleSubmit((data) => {
        loginuser.mutate(data);
      })}
      className="login-form"
    >
      <h1 style={headingStyle}>Library Management System</h1>

      {isSuccess && data && (
        <div className="alert alert-success">
          <p>
            <strong>
              Login successfully!
              <br />
              {data.message}
            </strong>
          </p>
        </div>
      )}

      {isError && (
        <div className="alert alert-danger">
          Login failed:{" "}
          {error?.response?.data?.message ||
            error?.message ||
            "An unknown error occurred."}
        </div>
      )}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="username" className="form-label">
            <strong> UserName</strong>
          </label>
          {errors.username && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.username.message}
            </span>
          )}
        </div>
        <input
          {...register("username")}
          id="username"
          type="text"
          className="form-control"
          placeholder="Enter your username"
        />
      </div>
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="age" className="form-label">
            <strong>Password</strong>
          </label>
          {errors.password && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.password.message}
            </span>
          )}
        </div>
        <input
          {...register("password")}
          id="password"
          type="password"
          className="form-control"
          placeholder="Enter your password"
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={isPending}>
        Login in
      </button>
      <strong>
        <br />
        Don't have an account?
        <br />
      </strong>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => navigate("/signup")}
      >
        Sign up
      </button>
    </form>
  );
};

export default Form;
