import bookpageImage from "../assets/bookpage.png";
import { Outlet } from "react-router-dom";
const MainpageLayout = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          margin: 0,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            flex: 1,
            position: "relative",
            backgroundImage: `url(${bookpageImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: "90%",
              maxWidth: "500px", // Limits the width on desktop
              padding: "40px",
              backgroundColor: "rgba(255, 255, 255, 0.1)", // Transparent white
              backdropFilter: "blur(7px)", // Frosted glass effect
              WebkitBackdropFilter: "blur(10px)", // Safari support
              borderRadius: "44px", // Rounded corners
              border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle outline
              boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)", // Depth shadow
              textAlign: "center",
              color: "white",
            }}
          >
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainpageLayout;
