import { Box } from "@chakra-ui/react";
import type { ReactNode } from "react";

interface ReactN {
  children: ReactNode;
}
const BookCardContainer = ({ children }: ReactN) => {
  return (
    <Box
      height={{ base: "440px", sm: "320px", md: "380px", lg: "400px" }}
      width={{ base: "340px", sm: "200px", md: "220px", lg: "100%" }}
      borderRadius={{ base: 6, md: 10 }}
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
