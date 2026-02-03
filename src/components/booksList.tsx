/* eslint-disable react-hooks/rules-of-hooks */
import { SimpleGrid, Text, Button, Flex } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import BookCardContainer from "./bookCardcountainer";
import BookCardskeleton from "./bookCardskeleton";
import Bookcard from "./Bookcard";
import useGetBook, { type BookSearchCriteria } from "../hooks/useGetbook";
import useGetbooks from "../hooks/useGetbooks";

interface viewdetails {
  onViewDetails: (bookData: any) => void;
  criteria?: BookSearchCriteria;
}

const BooksList = ({ onViewDetails, criteria }: viewdetails) => {
  // 1. State for current page
  const [page, setPage] = useState(0);

  // 2. Reset to Page 0 whenever criteria changes (User searches for something new)
  useEffect(() => {
    setPage(0);
  }, [criteria]);

  // 3. Pass 'page' to your hooks
  const { data, error, isLoading } = criteria
    ? useGetBook(criteria, page)
    : useGetbooks(page);

  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  if (error) return <Text>Error loading books.</Text>;

  return (
    <>
      <SimpleGrid
        padding="10px"
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        gap={6}
      >
        {isLoading &&
          skeletons.map((skeleton) => (
            <BookCardContainer key={skeleton}>
              <BookCardskeleton />
            </BookCardContainer>
          ))}

        {/* 4. FIX: Map over data.content (The Array), not data (The Page Object) */}
        {data?.content?.map((book: any, bookIndex: number) => (
          <BookCardContainer key={bookIndex}>
            <Bookcard book={book} onViewDetails={onViewDetails} />
          </BookCardContainer>
        ))}
      </SimpleGrid>

      {/* 5. Pagination Buttons */}
      {!isLoading && data && (
        <Flex justify="center" align="center" mt={8} mb={8} gap={4}>
          <Button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            isDisabled={data.first} // Disable if on first page
            colorScheme="blue"
            variant="outline"
          >
            Previous
          </Button>

          <Text fontWeight="bold">
            Page {data.number + 1} of {data.totalPages}
          </Text>

          <Button
            onClick={() => {
              if (!data.last) {
                setPage((old) => old + 1);
              }
            }}
            isDisabled={data.last} // Disable if on last page
            colorScheme="blue"
            variant="outline"
          >
            Next
          </Button>
        </Flex>
      )}
    </>
  );
};

export default BooksList;