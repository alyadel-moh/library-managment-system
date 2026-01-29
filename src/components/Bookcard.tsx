import {
  Button,
  Card,
  CardBody,
  Heading,
  HStack,
  Image,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import useGetGoogleBooks from "../hooks/useGetgooglebooksapi";
import type Book1 from "../entities/Book";
interface BookcardProps {
  book: Book1;
  onViewDetails: (bookData: Book1) => void;
}
const Bookcard = ({ book, onViewDetails }: BookcardProps) => {
  const bookDetails = useGetGoogleBooks(book.title).data?.items?.[0];
  return (
    <Card
      height="100%"
      display="flex"
      flexDirection="column"
      transition="all 0.3s"
      borderRadius="3xl"
      _hover={{}}
      overflow="hidden"
      borderBottom='1px solid'
      borderColor="blue.200"
    >
      <Box position="relative" overflow="hidden" bg="gray.50">
        <Image
          src={bookDetails?.volumeInfo.imageLinks?.thumbnail}
          alt="Book cover"
          height="250px"
          objectFit="contain"
          width="100%"
        />
      </Box>
      <CardBody
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        p={4}
      >
        <VStack align="stretch" spacing={2}>
          <Heading fontSize="md" noOfLines={2}>
            {book.title}
          </Heading>

          <HStack justifyContent="space-between" alignItems="center">
            <Text fontSize="sm" fontWeight="semibold">
              ${book.sellingPrice}
            </Text>

            <Text 
              fontSize="xs" 
              color={
                book.stockQuantity === 0
                  ? "red.500"
                  : book.stockQuantity > book.threshold
                    ? "green.500"
                    : "orange.500"
              }
              fontWeight="medium"
            >
              {book.stockQuantity === 0
                ? "OUT OF STOCK"
                : book.stockQuantity > book.threshold
                  ? "IN STOCK"
                  : "LOW STOCK"}
            </Text>
          </HStack>

          <Button
            borderRadius="full"
            colorScheme="blue"
            width="100%"
            leftIcon={<FiEye />}
            size="md"
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            onClick={() => onViewDetails(book)}
          >
            View Details
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default Bookcard;
