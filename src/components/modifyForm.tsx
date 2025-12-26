import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useModifyUser from "../hooks/useModifyuser";
import useGetUser from "../hooks/useGetusers";
import type { CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
interface ModifyFormProps {
  fieldName:
    | "username"
    | "password"
    | "firstName"
    | "lastname"
    | "phoneNumber"
    | "emailAddress"
    | "shippingAddress";
  fieldLabel?: string;
  fieldType?: string;
}

const ModifyForm = ({
  fieldName,
  fieldLabel,
  fieldType = "text",
}: ModifyFormProps) => {
  const navigate = useNavigate();
  const { data: userData } = useGetUser();

  // Calculate marginLeft based on specific fieldLabel values
  const getMarginLeft = (label: string = "") => {
    switch (label) {
      case "Email Address":
        return "-35px";
      case "Phone Number":
        return "-50px";
      case "Shipping Address":
        return "-75px";
      default:
        return "-13px";
    }
  };

  const headingStyle: CSSProperties = {
    marginBottom: "40px",
    textAlign: "center",
    fontSize: "2.5em",
    whiteSpace: "nowrap",
    marginLeft: getMarginLeft(fieldLabel),
  };
  const schema = z.object({
    [fieldName]:
      fieldName === "emailAddress"
        ? z.string().email({ message: "Invalid email address" })
        : z.string().min(1, { message: `${fieldLabel} is required` }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const { mutateAsync, isPending, isSuccess, isError, error } = useModifyUser();

  const onSubmit = async (formData: FormData) => {
    if (!userData) return;
    // Merge the single field update with existing user data
    const updatedUser = {
      username: userData.username,
      password: userData.password || "",
      firstName: userData.firstName,
      lastname: userData.lastname,
      phoneNumber: userData.phoneNumber,
      shippingAddress: userData.shippingAddress,
      emailAddress: userData.emailAddress,
      ...formData, // Override with the new field value
    };

    await mutateAsync(updatedUser);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    navigate("/profile", { replace: true });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="centered-form">
      {isSuccess && (
        <div className="alert alert-success">
          <strong>{fieldLabel} modified successfully!</strong>
        </div>
      )}
      <h1 style={headingStyle}>{fieldLabel} Modification</h1>
      {isError && (
        <div className="alert alert-danger">
          Failed to modify {fieldLabel}:{" "}
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
          <label htmlFor={fieldName} className="form-label">
            <strong>{fieldLabel}</strong>
          </label>
          {errors[fieldName] && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors[fieldName]?.message}
            </span>
          )}
        </div>
        <input
          {...register(fieldName)}
          id={fieldName}
          type={fieldType}
          className="form-control"
          placeholder={`Enter new ${fieldLabel}`}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={isPending}>
        {isPending ? "Updating..." : "Update"}
      </button>
    </form>
  );
};

export default ModifyForm;
