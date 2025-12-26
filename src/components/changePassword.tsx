import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useModifypassword from "../hooks/useModifypassword";
import { useNavigate } from "react-router-dom";
const ChangePassword = () => {
  const navigate = useNavigate();
  const schema = z.object({
    oldPassword: z.string().min(1, { message: "Old password is required" }),
    newPassword: z.string().min(1, { message: "New password is required" }),
  });
  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutateAsync, isPending, isSuccess, isError, error } =
    useModifypassword();

  const onSubmit = async (formData: FormData) => {
    const updatedUser = {
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword,
    };
    await mutateAsync(updatedUser);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/customer/dashboard", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-form2">
      <h1
        style={{
          marginBottom: "40px",
          textAlign: "center",
          fontSize: "2.5em",
          whiteSpace: "nowrap",
          marginLeft: "-10px",
        }}
      >
        Password Modification
      </h1>
      {isSuccess && (
        <div className="alert alert-success">
          <strong>Password modified successfully!</strong>
        </div>
      )}
      {isError && (
        <div className="alert alert-danger">
          Failed to modify password:{" "}
          {error?.response?.data?.message || error?.message || "Unknown error"}
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
          <label htmlFor="oldPassword" className="form-label">
            <strong>Old Password</strong>
          </label>
          {errors.oldPassword && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.oldPassword.message}
            </span>
          )}
        </div>
        <input
          {...register("oldPassword")}
          id="oldPassword"
          type="password"
          className="form-control"
          placeholder="Enter old password"
          style={{ fontSize: "1.1rem", padding: "12px" }}
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
          <label htmlFor="newPassword" className="form-label">
            <strong>New Password</strong>
          </label>
          {errors.newPassword && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.newPassword.message}
            </span>
          )}
        </div>
        <input
          {...register("newPassword")}
          id="newPassword"
          type="password"
          className="form-control"
          placeholder="Enter new password"
          style={{ fontSize: "1.1rem", padding: "12px" }}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={isPending}>
        Update Password
      </button>
    </form>
  );
};

export default ChangePassword;
