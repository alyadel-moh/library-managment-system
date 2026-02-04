/* eslint-disable react-hooks/rules-of-hooks */
import { SimpleGrid, Text, Spinner } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
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
  const [page, setPage] = useState(0);
  const [allBooks, setAllBooks] = useState<any[]>([]);
  const pageSize = 10;

  const { data, error, isLoading } = criteria
    ? useGetBook(criteria, page, pageSize)
    : useGetbooks(page, pageSize); 

  // Console log the response
  useEffect(() => {
    if (data) {
      console.log("Books response:", data);
      console.log("Page:", page);
      console.log("Content:", data.content);
      console.log("Number of books in content:", data.content?.length);
      console.log("Total elements:", data.totalElements);
      console.log("Total pages:", data.totalPages);
      console.log("Is last page:", data.last);
      console.log("Books data:", data.content?.map(book => ({
        isbn: book.isbn,
        title: book.title,
        price: book.sellingPrice,
        photoUrl: book.photoUrl
      })));
    }
  }, [data, page]);

  // Reset when criteria changes
  useEffect(() => {
    setPage(0);
    setAllBooks([]);
  }, [criteria]);
  // Append new books when data changes
  useEffect(() => {
    if (data?.content) {
      if (page === 0) {
        setAllBooks(data.content);
      } else {
        setAllBooks((prev) => [...prev, ...data.content]);
      }
    }
  }, [data, page]);
  const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const fetchMoreData = () => {
    if (data && !data.last) {
      setPage((prev) => prev + 1);
    }
  };
  if (error) return <Text>Error loading books.</Text>;
  return (
    <InfiniteScroll
      dataLength={allBooks.length}
      next={fetchMoreData}
      hasMore={!isLoading && data ? !data.last : true}
      loader={<Spinner />}
    >
      <SimpleGrid
        padding="10px"
        columns={{ sm: 1, md: 2, lg: 3, xl: 5 }}
        gap={6}
      >
        {isLoading &&
          page === 0 &&
          skeletons.map((skeleton) => (
            <BookCardContainer key={skeleton}>
              <BookCardskeleton />
            </BookCardContainer>
          ))}

        {allBooks.map((book: any, bookIndex: number) => (
          <BookCardContainer key={`${book.isbn}-${bookIndex}`}>
            <Bookcard book={book} onViewDetails={onViewDetails} />
          </BookCardContainer>
        ))}
      </SimpleGrid>
    </InfiniteScroll>
  );
};

export default BooksList;
