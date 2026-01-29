import React from "react";
import Colormodeswitch from "../components/Colormodeswitch";
import bookpageImage from "../assets/bookpage.png";
import { Outlet } from "react-router-dom";
import { HStack, Text } from "@chakra-ui/react";
const MainpageLayout = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          zIndex: 10,
        }}
      >
        <Colormodeswitch />
      </div>
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
          }}
        >
          <HStack spacing={2} position="absolute" top={3} left={700} zIndex={5}>
            <Text
              fontSize="3xl"
              fontWeight="900"
              letterSpacing="tighter"
              color="blue.200"
            >
              Book
            </Text>
            <Text fontSize="3xl" fontWeight="300">
              shelf
            </Text>
          </HStack>
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(1px)",
            }}
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              right: 0,
              bottom: 0,
              width: "150px",
              background:
                "linear-gradient(to right, transparent, var(--chakra-colors-chakra-body-bg))",
            }}
          />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
          }}
        >
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default MainpageLayout;
