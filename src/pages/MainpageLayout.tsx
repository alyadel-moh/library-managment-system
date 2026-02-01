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
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainpageLayout;
