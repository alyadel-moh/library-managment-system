import { Box, Grid, GridItem, Show, useToast } from "@chakra-ui/react"; // Added useToast
import { useEffect, useState, useRef } from "react"; // Added useRef
import { useSearchParams, useNavigate } from "react-router-dom"; // Added useNavigate
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
import useGetUser from "../hooks/useGetusers";

const Homepage = () => {
  const [selectedView, setSelectedView] = useState<string>("books");
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [criteria, setCriteria] = useState<BookSearchCriteria | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  
  // Hooks for Payment Logic
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const toast = useToast();
  
  // Ref to prevent double-firing in React Strict Mode
  const processedRef = useRef(false);

  // --- EXISTING SEARCH LOGIC ---
  const searchQuery = searchParams.get("search");
  if (searchQuery && (!criteria || criteria.keyword !== searchQuery)) {
    setCriteria((prev) => ({ ...prev, keyword: searchQuery }));
  }

  // --- NEW: PAYMENT VERIFICATION LOGIC ---
  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (sessionId && !processedRef.current) {
      processedRef.current = true; // Mark as processed immediately
      verifyPayment(sessionId);
    }
  }, [searchParams]);

  const verifyPayment = async (sessionId: string) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch("http://localhost:8080/api/payments/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ sessionId })
      });

      if (response.ok) {
        toast({
          title: "Payment Successful!",
          description: "Your order has been placed successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        
        // Switch view to 'orders' so they can see their new book!
        setSelectedView("orders"); 
        
        // Remove the ugly session_id from the URL without reloading
        setSearchParams({});
      } else {
        throw new Error("Payment verification failed");
      }
    } catch (error) {
      console.error(error);
      toast({
        title: "Order Verification Failed",
        description: "We could not verify your payment. Please check your order history.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  // ----------------------------------------

  const handleCriteriaChange = (newCriteria: Partial<BookSearchCriteria>) => {
    setCriteria((prev) => ({ ...prev, ...newCriteria }));
  };

  const handleViewDetails = (book: any) => {
    setSelectedBook(book);
    setSelectedView("bookDetail");
  };

  const { data: userData } = useGetUser();

  useEffect(() => {
    if (userData?.photoUrl) {
      setPhotoUrl(userData.photoUrl);
    }
  }, [userData]);

  const handlePhotoUpdate = (newUrl: string) => {
    setPhotoUrl(newUrl);
  };

  useEffect(() => {
    if (searchQuery) {
      setSelectedView("books");
    }
  }, [searchQuery]);

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
            <ViewProfile refetchphoto={handlePhotoUpdate} />
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Homepage;