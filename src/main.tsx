import { StrictMode, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./routing/routes.tsx";
import { RouterProvider } from "react-router-dom";
import {
  ChakraProvider,
  ColorModeScript,
  Spinner,
  Center,
} from "@chakra-ui/react";
import theme from "./theme";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <QueryClientProvider client={queryClient}>
        <Suspense
          fallback={
            <Center h="100vh">
              <Spinner size="xl" color="blue.500" thickness="4px" />
            </Center>
          }
        >
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ChakraProvider>
  </StrictMode>,
);
