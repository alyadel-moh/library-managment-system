/* eslint-disable react-hooks/set-state-in-effect */
import { Box, Grid, GridItem, Show } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import BooksList from "../components/booksList";
import ViewProfile from "../components/viewProfile";
import Adminsidebar from "../components/Adminsidebar";
import Addbook from "../components/Addbook";
import ModifyBook from "../components/modifyBook";
import type Book1 from "../entities/Book";
import Publisherorders from "../components/Publisherorders";
import BrowseCategories from "../components/browseCategories";
import Reports from "../components/reports";
import { useEffect, useState } from "react";
import type { BookSearchCriteria } from "../hooks/useGetbook";
import YearInput from "../components/yearSelector";
import PriceRangeSelector from "../components/priceSelector";
const Adminpage = () => {
  const [selectedView, setSelectedView] = useState<string>("books");
  const [selectedBook, setSelectedBook] = useState<Book1 | null>(null);
  const [criteria, setCriteria] = useState<BookSearchCriteria | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const handleViewDetails = (bookData: Book1) => {
    setSelectedBook(bookData);
    setSelectedView("modifyBook");
  };
  useEffect(() => {
    if (searchQuery) {
      setCriteria((prev) => ({ ...prev, keyword: searchQuery }));
    }
  }, [searchQuery]);

  const handleCriteriaChange = (newCriteria: Partial<BookSearchCriteria>) => {
    setCriteria((prev) => ({
      ...prev,
      ...newCriteria,
    }));
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
          <Adminsidebar
            onViewChange={setSelectedView}
            refetchphoto={photoUrl}
          />
        </GridItem>
      </Show>
      <GridItem area="main">
        <Box paddingLeft={3}>
          {selectedView === "profile" ? (
            <ViewProfile
              refetchphoto={(photo) => {
                setPhotoUrl(photo);
              }}
            />
          ) : selectedView === "Addbook" ? (
            <Addbook />
          ) : selectedView === "modifyBook" && selectedBook ? (
            <ModifyBook book={selectedBook} />
          ) : selectedView === "pending" ? (
            <Publisherorders />
          ) : selectedView === "reports" ? (
            <Reports />
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
          ) : null}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Adminpage;
