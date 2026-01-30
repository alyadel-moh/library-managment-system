/* eslint-disable react-hooks/rules-of-hooks */
import { SimpleGrid, Text } from "@chakra-ui/react";
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
  const { data, error, isLoading } = criteria
    ? useGetBook(criteria)
    : useGetbooks();
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
        {data?.map((book, bookIndex) => (
          <BookCardContainer key={bookIndex}>
            <Bookcard book={book} onViewDetails={onViewDetails} />
          </BookCardContainer>
        ))}
      </SimpleGrid>
    </>
  );
};

export default BooksList;
