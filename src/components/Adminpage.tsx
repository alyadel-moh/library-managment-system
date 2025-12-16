import React, { type CSSProperties } from "react";
import { useNavigate } from "react-router-dom";

const Adminpage = () => {
  const navigate = useNavigate();

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
        </div>
      </div>
    </>
  );
};

export default Adminpage;
