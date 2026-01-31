import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ReactN {
  children: ReactNode;
}
const BookCardContainer = ({ children }: ReactN) => {
  return (
    <Box
      width="100%"
      height="400px"
      borderRadius={10}
      overflow="hidden"
      _hover={{
        transform: "scale(1.05)",
        transition: "transform .15s ease-in",
      }}
    >
      {children}
    </Box>
  );
};

export default BookCardContainer;
