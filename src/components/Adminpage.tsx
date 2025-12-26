import React, { type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";
import useLogout from "../hooks/UseLogout";

const Adminpage = () => {
  const navigate = useNavigate();
  const logoutQuery = useLogout();
  const {
    data: Logoutdata,
    isError: logoutError,
    error: logoutErrorMsg,
  } = logoutQuery;
  const customButtonStyle: CSSProperties = {
    padding: "20px 100px",
    fontSize: "18px",
    width: "auto",
  };

  const headingStyle: CSSProperties = {
    marginBottom: "40px",
    textAlign: "center",
    fontSize: "2.5em",
  };

  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: "10px",
        }}
      >
        <h1 style={headingStyle}> Library Management System</h1>

        {/* Button Container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          <button
            className="btn btn-primary"
            style={customButtonStyle}
            type="button"
            onClick={() => navigate("/profile")}
          >
            view Profile
          </button>
          <button
            className="btn btn-primary"
            style={customButtonStyle}
            type="button"
            onClick={() => navigate("/modify/password")}
          >
            Modify Password
          </button>
          <button
            className="btn btn-primary"
            style={customButtonStyle}
            type="button"
            onClick={() => navigate("/addbook")}
          >
            Add Book
          </button>
          <button
            className="btn btn-primary"
            style={customButtonStyle}
            type="button"
            onClick={() => navigate("/modifybook")}
          >
            Search & Modify Books
          </button>
          <button
            className="btn btn-primary"
            style={customButtonStyle}
            type="button"
            onClick={() => navigate("/pendingorders")}
          >
            Pending orders
          </button>
          <button
            className="btn btn-primary"
            style={customButtonStyle}
            type="button"
            onClick={() => navigate("/reports")}
          >
            System Reports
          </button>
          <button
            className="btn btn-primary"
            style={customButtonStyle}
            type="button"
            onClick={async () => {
              try {
                await logoutQuery.mutateAsync();
                await new Promise((resolve) => setTimeout(resolve, 1000));
                navigate("/", { replace: true });
              } catch (error) {
                console.error("Logout error", error);
              }
            }}
          >
            Logout
          </button>
          {Logoutdata && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px 20px",
                backgroundColor: "#d4edda",
                color: "#155724",
                border: "1px solid #c3e6cb",
                borderRadius: "5px",
                fontSize: "1.1rem",
              }}
            >
              {Logoutdata.message}
            </div>
          )}
          {logoutError && (
            <div
              style={{
                marginTop: "20px",
                padding: "15px 20px",
                backgroundColor: "#f8d7da",
                color: "#721c24",
                border: "1px solid #f5c6cb",
                borderRadius: "5px",
                fontSize: "1.1rem",
              }}
            >
              {logoutErrorMsg?.message || "Error logging out"}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Adminpage;
