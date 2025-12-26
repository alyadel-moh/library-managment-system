import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useCardcheckout from "../hooks/useCardcheckout";
import { useLocation } from "react-router-dom";
const schema = z.object({
  cardNumber: z.string().min(1, { message: "Card number is required" }),
  expiryDate: z.string().min(1, { message: "Expiry date is required" }),
  cvv: z.string().min(1, { message: "CVV is required" }),
});
type formdata = z.infer<typeof schema>;
const Form = () => {
  const location = useLocation();
  const expectedTotal = location.state?.expectedTotal || 0;
  const {
    register,
    handleSubmit,
    formState: { errors }, // is valid for disabelling submit buttton and formsate used for displaying error messages
  } = useForm<formdata>({ resolver: zodResolver(schema) }); // manage form state errors validations submissionhandling i mean it builds and validate form
  const cardcheckout = useCardcheckout();
  const { isPending, isSuccess, isError, error, data } = cardcheckout;
  return (
    <form
      onSubmit={handleSubmit((data) => {
        cardcheckout.mutate({ ...data, expectedTotal });
      })}
      className="centered-form2"
    >
      <h1
        style={{
          marginBottom: "40px",
          textAlign: "center",
          fontSize: "2.5em",
          whiteSpace: "nowrap",
          marginLeft: "-5px",
        }}
      >
        Checkout Form
      </h1>
      {isSuccess && data && (
        <div className="alert alert-success">
          <p>
            <strong>{data.message}</strong>
          </p>
        </div>
      )}
      {isError && (
        <div className="alert alert-danger">
          Failed to checkout:{" "}
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
          <label htmlFor="cardNumber" className="form-label">
            <strong>Card Number</strong>
          </label>
          {errors.cardNumber && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.cardNumber.message}
            </span>
          )}
        </div>
        <input
          {...register("cardNumber")}
          id="cardNumber"
          type="text"
          className="form-control"
          placeholder="Enter your card number"
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
          <label htmlFor="expiryDate" className="form-label">
            <strong>Expiry Date</strong>
          </label>
          {errors.expiryDate && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.expiryDate.message}
            </span>
          )}
        </div>
        <input
          {...register("expiryDate")}
          id="expiryDate"
          type="text"
          className="form-control"
          placeholder="Enter your expiry date"
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
          <label htmlFor="cvv" className="form-label">
            <strong>CVV</strong>
          </label>
          {errors.cvv && (
            <span className="text-danger" style={{ fontSize: "0.875rem" }}>
              {errors.cvv.message}
            </span>
          )}
        </div>
        <input
          {...register("cvv")}
          id="cvv"
          type="text"
          className="form-control"
          placeholder="Enter your CVV"
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={isPending}>
        Checkout
      </button>
    </form>
  );
};
export default Form;
