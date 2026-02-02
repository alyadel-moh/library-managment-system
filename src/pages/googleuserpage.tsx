import { Box, Button, Grid, GridItem, Show, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import BooksList from "../components/booksList";
import Sidebar from "../components/Sidebar";
import ViewCart from "../components/viewCart";
import ViewOrderhistory from "../components/viewOrderhistory";
import Bookdetailpage from "./Bookdetailpage";
import BrowseCategories from "../components/browseCategories";
import type { BookSearchCriteria } from "../hooks/useGetbook";
import YearInput from "../components/yearSelector";
import PriceRangeSelector from "../components/priceSelector";
import ViewSaved from "../components/savedbooks";
import { FiX } from "react-icons/fi";
import Viewprofilegoogle from "../components/viewprofilegoogle";
import useGetUser from "../hooks/useGetusers";

const GoogleUserPage = () => {
  const [selectedView, setSelectedView] = useState<string>("books");
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [criteria, setCriteria] = useState<BookSearchCriteria | null>(null);
  const navigate = useNavigate();
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const { data: userData } = useGetUser();
  const processedRef = useRef(false);
  const oauthProcessedRef = useRef(false); // ⭐ Separate ref for OAuth

  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  // Initialize photoUrl from user data when it loads
  useEffect(() => {
    if (userData?.photoUrl && !photoUrl) {
      setPhotoUrl(userData.photoUrl);
    }
  }, [userData?.photoUrl]);

  useEffect(() => {
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCriteria((prev) => ({ ...prev, keyword: searchQuery }));
    }
  }, [searchQuery]);
  const handleCriteriaChange = (newCriteria: Partial<BookSearchCriteria>) => {
    setCriteria((prev) => ({ ...prev, ...newCriteria }));
  };

  // --- ⭐ NEW: OAUTH TOKEN HANDLING ---
  useEffect(() => {
    const token = searchParams.get("token");
    const error = searchParams.get("error");
    const message = searchParams.get("message");

    // Handle OAuth errors
    if (error && !oauthProcessedRef.current) {
      oauthProcessedRef.current = true;

      console.error("OAuth error:", message);
      toast({
        title: "Login Failed",
        description: message || "Authentication failed. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      // Clear error params and redirect to login
      navigate("/", { replace: true });
      return;
    }

    // Handle successful OAuth login
    if (token && !oauthProcessedRef.current) {
      oauthProcessedRef.current = true;

      // Save token to localStorage
      localStorage.setItem("accessToken", token); // ⭐ Using your existing token key

      console.log("OAuth login successful!");
      toast({
        title: "Welcome!",
        description: "You have successfully logged in with Google.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top",
      });

      // Remove token from URL (clean up)
      const newParams = new URLSearchParams(searchParams);
      newParams.delete("token");
      newParams.delete("error");
      newParams.delete("message");
      setSearchParams(newParams, { replace: true });
    }
  }, [searchParams, navigate, setSearchParams]);

  // --- ⭐ CHECK AUTHENTICATION ---
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    // Only redirect if no token AND no OAuth params in URL
    if (
      !token &&
      !searchParams.get("token") &&
      !searchParams.get("session_id")
    ) {
      navigate("/", { replace: true });
    }
  }, [navigate, searchParams]);

  // --- PAYMENT VERIFICATION LOGIC ---
  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId && !processedRef.current) {
      processedRef.current = true;
      verifyPayment(sessionId);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId: string) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        "https://ordering-system-58at.onrender.com/api/payments/verify-payment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ sessionId }),
        },
      );

      if (response.ok) {
        toast({
          title: "Payment Successful!",
          status: "success",
        });

        setSelectedView("orders");
        setSearchParams({});
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error) {
      console.error(error);
      toast({
        title:
          "We could not verify your payment. Please check your order history.",
        status: "error",
      });
    }
  };

  const handleViewDetails = (book: any) => {
    setSelectedBook(book);
    setSelectedView("bookDetail");
  };
  return (
    <Grid
      templateAreas={{ base: `"main"`, lg: `"aside main"` }}
      templateColumns={{ base: "1fr", lg: "200px 1fr" }}
    >
      <Show above="lg">
        <GridItem
          area="aside"
          padding="5px"
          position="fixed"
          top="100px"
          height="calc(100vh - 100px)"
        >
          <Sidebar onViewChange={setSelectedView} refetchphoto={photoUrl} />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={3}>
          {selectedView === "bookDetail" && selectedBook ? (
            <Bookdetailpage book={selectedBook} />
          ) : selectedView === "books" ? (
            <>
              <BrowseCategories setCriteria={handleCriteriaChange} />
              <YearInput setCriteria={handleCriteriaChange} />
              <PriceRangeSelector setCriteria={handleCriteriaChange} />
              <Button
                mt={4}
                mb={4}
                borderRadius="full"
                colorScheme="red"
                width="120px"
                size="sm"
                marginLeft="1063px"
                marginTop="-70px"
                transition="all 0.2s"
                _hover={{ transform: "scale(1.05)" }}
                leftIcon={<FiX />}
                onClick={() => {
                  setCriteria(null);
                  setSearchParams(new URLSearchParams());
                }}
              >
                Clear Filters
              </Button>
              <BooksList
                onViewDetails={handleViewDetails}
                criteria={criteria || undefined}
              />
            </>
          ) : selectedView === "cart" ? (
            <ViewCart />
          ) : selectedView === "orders" ? (
            <ViewOrderhistory />
          ) : selectedView === "saved" ? (
            <ViewSaved onViewDetails={handleViewDetails} />
          ) : (
            <Viewprofilegoogle
              refetchphoto={(photo) => {
                setPhotoUrl(photo);
              }}
            />
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default GoogleUserPage;
