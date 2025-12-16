import useGetUser from "../hooks/useGetusers";
import { useNavigate } from "react-router-dom";
const ViewProfile = () => {
  const navigate = useNavigate();
  const { data, isPending, isError, error } = useGetUser();

  if (isPending) {
    return <div className="text-center mt-5">Loading profile...</div>;
  }

  if (isError) {
    console.error("Profile error:", error);
    return (
      <div className="alert alert-danger mt-5">
        Failed to load profile: {error?.message || "Unknown error"}
        <br />
        <small>Make sure you're logged in and have a valid token.</small>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "beige",
        padding: "20px",
        margin: "0",
        overflow: "auto",
        boxSizing: "border-box",
      }}
    >
      <table
        className="table table-bordered"
        style={{
          width: "100%",
          height: "90%",
          backgroundColor: "#e3f2fd",
          margin: "0",
          borderColor: "black",
        }}
      >
        <thead style={{ backgroundColor: "beige" }}>
          <tr>
            <th
              colSpan={3}
              style={{
                textAlign: "center",
                fontSize: "2rem",
                padding: "20px",
                backgroundColor: "beige",
              }}
            >
              {data.firstName} {data.lastname}'s Profile
            </th>
          </tr>
          <tr>
            <th
              style={{
                fontSize: "1.2rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              Field
            </th>
            <th
              style={{
                fontSize: "1.2rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              Value
            </th>
            <th
              style={{
                fontSize: "1.2rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody style={{ backgroundColor: "beige" }}>
          <tr>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              <strong>Username</strong>
            </td>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              {data.username}
            </td>
            <td style={{ padding: "15px", backgroundColor: "beige" }}>
              <button
                className="btn btn-outline-danger"
                style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                onClick={() => navigate("/modify/username")}
              >
                Modify
              </button>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              <strong>First Name</strong>
            </td>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              {data.firstName}
            </td>
            <td style={{ padding: "15px", backgroundColor: "beige" }}>
              <button
                className="btn btn-outline-danger"
                style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                onClick={() => navigate("/modify/firstName")}
              >
                Modify
              </button>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              <strong>Last Name</strong>
            </td>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              {data.lastname}
            </td>
            <td style={{ padding: "15px", backgroundColor: "beige" }}>
              <button
                className="btn btn-outline-danger"
                style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                onClick={() => navigate("/modify/lastName")}
              >
                Modify
              </button>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              <strong>Email Address</strong>
            </td>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              {data.emailAddress}
            </td>
            <td style={{ padding: "15px", backgroundColor: "beige" }}>
              <button
                className="btn btn-outline-danger"
                style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                onClick={() => navigate("/modify/email")}
              >
                Modify
              </button>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              <strong>Phone Number</strong>
            </td>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              {data.phoneNumber}
            </td>
            <td style={{ padding: "15px", backgroundColor: "beige" }}>
              <button
                className="btn btn-outline-danger"
                style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                onClick={() => navigate("/modify/phoneNumber")}
              >
                Modify
              </button>
            </td>
          </tr>
          <tr>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              <strong>Shipping Address</strong>
            </td>
            <td
              style={{
                fontSize: "1.1rem",
                padding: "15px",
                backgroundColor: "beige",
              }}
            >
              {data.shippingAddress}
            </td>
            <td style={{ padding: "15px", backgroundColor: "beige" }}>
              <button
                className="btn btn-outline-danger"
                style={{ fontSize: "1.1rem", padding: "12px 30px" }}
                onClick={() => navigate("/modify/shippingAddress")}
              >
                Modify
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ViewProfile;
