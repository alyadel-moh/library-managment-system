import { Box, Grid, GridItem, Heading, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BooksList from "../components/booksList";
import Sidebar from "../components/Sidebar";
import ViewProfile from "../components/viewProfile";
import ViewCart from "../components/viewCart";
import ViewOrderhistory from "../components/viewOrderhistory";
import Checkoutform from "../components/Checkoutform";
import Bookdetailpage from "./Bookdetailpage";
import BrowseCategories from "../components/browseCategories";

const Homepage = () => {
  const [selectedView, setSelectedView] = useState<string>("books");
  const [selectedBook, setSelectedBook] = useState<any>(null);
  const [expectedTotal, setExpectedTotal] = useState<string>("");
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const handleViewDetails = (book: any) => {
    setSelectedBook(book);
    setSelectedView("bookDetail");
  };
  useEffect(() => {
    if (searchQuery) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
          position="sticky"
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
              <Heading as="h1" marginY={5} fontSize="3xl">
                {searchQuery ? `Search results for "${searchQuery}"` : ""}
              </Heading>
              <BooksList
                onViewDetails={handleViewDetails}
                search={searchQuery || ""}
              />
            </>
          ) : selectedView === "cart" ? (
            <ViewCart
              onViewChange={(view, total) => {
                setSelectedView(view);
                if (total !== undefined) setExpectedTotal(total);
              }}
            />
          ) : selectedView === "orders" ? (
            <ViewOrderhistory />
          ) : selectedView === "checkout" ? (
            <Checkoutform expectedTotal={expectedTotal} />
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
