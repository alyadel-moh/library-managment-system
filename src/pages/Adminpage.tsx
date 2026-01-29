import { Box, Grid, GridItem, Heading, Show } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BooksList from "../components/booksList";
import ViewProfile from "../components/viewProfile";
import Adminsidebar from "../components/Adminsidebar";
import Addbook from "../components/Addbook";
import ModifyBook from "../components/modifyBook";
import type Book1 from "../entities/Book";
import Publisherorders from "../components/Publisherorders";
import BrowseCategories from "../components/browseCategories";
const Adminpage = () => {
  const [selectedView, setSelectedView] = useState<string>("All Categories");
  const [selectedBook, setSelectedBook] = useState<Book1 | null>(null);
  const [photoUrl, setPhotoUrl] = useState<string>("");
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const handleViewDetails = (bookData: Book1) => {
    setSelectedBook(bookData);
    setSelectedView("modifyBook");
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
          position="sticky"
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
          ) : (
            <>
              <BrowseCategories onViewChange={setSelectedView} />
              <Heading as="h1" marginY={5} fontSize="3xl">
                {searchQuery ? `Search results for "${searchQuery}"` : ""}
              </Heading>
              <BooksList
                onViewDetails={handleViewDetails}
                search={searchQuery || ""}
                category={selectedView}
              />
            </>
          )}
        </Box>
      </GridItem>
    </Grid>
  );
};

export default Adminpage;
