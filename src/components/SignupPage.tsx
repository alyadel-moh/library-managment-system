import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import UseAdduser from "../hooks/UseAdduser";
import { useNavigate } from "react-router-dom";
const schema = z.object({
  username: z.string().min(1, { message: "UserName is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  firstName: z.string().min(1, { message: "First name is required" }),
  lastname: z.string().min(1, { message: "Last name is required" }),
  phoneNumber: z.string().min(1, { message: "Phone number is required" }),
  shippingAddress: z
    .string()
    .min(1, { message: "Shipping address is required" }),
  emailAddress: z
    .string()
    .min(1, { message: "Email address is required" })
    .email({ message: "Invalid Email address" }),
});
type formdata = z.infer<typeof schema>;
const Form = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // is valid for disabelling submit buttton and formsate used for displaying error messages
  } = useForm<formdata>({ resolver: zodResolver(schema) }); // manage form state errors validations submissionhandling i mean it builds and validate form
  const addUser = UseAdduser();
  const navigate = useNavigate();
  const { isPending, isSuccess, isError, error, data, mutateAsync } = addUser;
  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        await mutateAsync(data);
        await new Promise((resolve) => setTimeout(resolve, 2000));
        navigate("/customer/dashboard", { replace: true });
      })}
      className="signup-form"
    >
      {isSuccess && data && (
        <div className="alert alert-success">
          <p>
            <strong>
              {data.status}
              <br />
              {data.message}
            </strong>
          </p>
        </div>
      )}
      {isError && (
        <div className="alert alert-danger">
          Failed to create user:{" "}
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
            <strong>UserName</strong>
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
      {/* 2. Password */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="password" className="form-label">
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
          // Should use 'password' type for security
          type="password"
          className="form-control"
          placeholder="Enter your password"
        />
      </div>

      {/* 3. First Name */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="firstName" className="form-label">
            <strong>First name</strong>
          </label>
          {errors.firstName && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.firstName.message}
            </span>
          )}
        </div>
        <input
          {...register("firstName")}
          id="firstName"
          type="text"
          className="form-control"
          placeholder="Enter your first name"
        />
      </div>

      {/* 4. Last Name */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="lastname" className="form-label">
            <strong>Last name</strong>
          </label>
          {errors.lastname && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.lastname.message}
            </span>
          )}
        </div>
        <input
          {...register("lastname")}
          id="lastname"
          type="text"
          className="form-control"
          placeholder="Enter your last name"
        />
      </div>

      {/* 5. Phone number */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="phoneNumber" className="form-label">
            <strong>Phone number</strong>
          </label>
          {errors.phoneNumber && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.phoneNumber.message}
            </span>
          )}
        </div>
        <input
          {...register("phoneNumber")}
          id="phoneNumber"
          type="tel"
          className="form-control"
          placeholder="Enter your phone number"
        />
      </div>
      {/* 6. Email */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="emailAddress" className="form-label">
            <strong>Email Address</strong>
          </label>
          {errors.emailAddress && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.emailAddress.message}
            </span>
          )}
        </div>
        <input
          {...register("emailAddress")}
          id="emailAddress"
          type="email"
          className="form-control"
          placeholder="Enter your email address"
        />
      </div>
      {/* 7. Shipping address */}
      <div className="mb-3">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <label htmlFor="shippingAddress" className="form-label">
            <strong>Shipping address</strong>
          </label>
          {errors.shippingAddress && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.shippingAddress.message}
            </span>
          )}
        </div>
        {/* Using a 'textarea' is better for long addresses */}
        <textarea
          {...register("shippingAddress")}
          id="shippingAddress"
          className="form-control"
          placeholder="Enter your shipping address"
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={isPending}>
        Sign Up
      </button>
    </form>
  );
};
export default Form;
