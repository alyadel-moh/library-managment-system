/* eslint-disable react-hooks/rules-of-hooks */
import { SimpleGrid, Text } from "@chakra-ui/react";
import BookCardContainer from "./bookCardcountainer";
import BookCardskeleton from "./bookCardskeleton";
import Bookcard from "./Bookcard";
import useGetbooks from "../hooks/useGetbooks";
import useGetbook from "../hooks/useGetbook";
import useGetBooksbycategory from "../hooks/useGetbookbycategory";
interface viewdetails {
  onViewDetails: (bookData: any) => void;
  search?: string;
  category?: string;
}
const BooksList = ({ onViewDetails, search, category }: viewdetails) => {
  const { data, error, isLoading } =
    category === "All Categories"
      ? useGetbooks()
      : search
        ? useGetBooksbycategory(category || "")
        : useGetbook(search || "");

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
