import { Box, Button, Grid, GridItem, Show, useToast } from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BooksList from "../components/booksList";
import Sidebar from "../components/Sidebar";
import ViewProfile from "../components/viewProfile";
import ViewCart from "../components/viewCart";
import ViewOrderhistory from "../components/viewOrderhistory";
import Bookdetailpage from "./Bookdetailpage";
import BrowseCategories from "../components/browseCategories";
import type { BookSearchCriteria } from "../hooks/useGetbook";
import YearInput from "../components/yearSelector";
import PriceRangeSelector from "../components/priceSelector";
import ViewSaved from "../components/savedbooks";
import { FiX } from "react-icons/fi";
import useGetUser from "../hooks/useGetusers";

const Homepage = () => {
  const [selectedView, setSelectedView] = useState<string>("books");
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [criteria, setCriteria] = useState<BookSearchCriteria | null>(null);
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const processedRef = useRef(false);
  const { data: userData } = useGetUser();
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  useEffect(() => {
    if (userData?.photoUrl && !photoUrl) {
      setPhotoUrl(userData.photoUrl);
    }
  }, [userData?.photoUrl, photoUrl]);

  useEffect(() => {
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCriteria((prev) => ({ ...prev, keyword: searchQuery }));
    }
  }, [searchQuery]);
  const handleCriteriaChange = (newCriteria: Partial<BookSearchCriteria>) => {
    setCriteria((prev) => ({ ...prev, ...newCriteria }));
  };
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
        title: "Payment Verification Failed",
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
          ) : selectedView === "saved" ? (
            <ViewSaved onViewDetails={handleViewDetails} />
          ) : selectedView === "orders" ? (
            <ViewOrderhistory />
          ) : selectedView === "cart" ? (
            <ViewCart />
          ) : (
            <ViewProfile
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

export default Homepage;
