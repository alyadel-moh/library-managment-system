import { useEffect } from "react";
import Expandabletext from "../components/expandableText";
import {
  Box,
  GridItem,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  HStack,
  Button,
  Image,
  useToast,
} from "@chakra-ui/react";
import {
  FiUser,
  FiCalendar,
  FiBookOpen,
  FiStar,
  FiShoppingCart,
} from "react-icons/fi";
import { MdBusinessCenter } from "react-icons/md";
import useAddBooktocart from "../hooks/useAddbooktocart";
import type Book1 from "../entities/Book";
interface BookdetailpageProps {
  book: Book1;
}
const Bookdetailpage = ({ book }: BookdetailpageProps) => {
  const toast = useToast({
    position: "bottom-right",
    duration: 4000,
    isClosable: true,
  });
  const addbooktocart = useAddBooktocart(book?.isbn || "");
  const {
    data: addBooktocartData,
    isError: addBooktocartError,
    error: addBooktocartErrorMsg,
    isPending: addBooktocartIsPending,
  } = addbooktocart;
  useEffect(() => {
    if (addBooktocartData) {
      toast({
        title: addBooktocartData.message,
        status: "success",
      });
    }
  }, [addBooktocartData]);

  // Show error toast
  useEffect(() => {
    if (addBooktocartError && addBooktocartErrorMsg) {
      toast({
        title: "Add to Cart Failed",
        description: addBooktocartErrorMsg?.response?.data?.message,
        status: "error",
      });
    }
  }, [addBooktocartError, addBooktocartErrorMsg]);
  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={120} p={50}>
      <GridItem>
        <VStack align="start" spacing={5}>
          <Heading size="xl">{book.title}</Heading>

          {book.authors && (
            <HStack spacing={2}>
              <FiUser />
              <Text fontSize="lg" color="gray.400" marginBottom="1">
                {book.authors
                  .map((author) => author.firstName + " " + author.lastName)
                  .join(" , ")}
              </Text>
            </HStack>
          )}

          {book.publisher && (
            <HStack spacing={2}>
              <MdBusinessCenter />
              <Text fontSize="md" color="gray.500" marginBottom="1">
                {book.publisher.publisherName}
              </Text>
            </HStack>
          )}

          {book.publicationYear && (
            <HStack spacing={2}>
              <FiCalendar />
              <Text fontSize="md" color="gray.500" marginBottom="1">
                {book.publicationYear}
              </Text>
            </HStack>
          )}

          {book.category && (
            <HStack spacing={2}>
              <FiBookOpen />
              <Text fontSize="md" color="blue.400" marginBottom="1">
                {book.category.name}
              </Text>
            </HStack>
          )}

          {book.averageRating && (
            <HStack spacing={2}>
              <FiStar color="gold" />
              <Text
                fontSize="md"
                fontWeight="bold"
                color="yellow.400"
                marginBottom="1"
              >
                {book.averageRating}
              </Text>
            </HStack>
          )}

          {book.description && (
            <Box>
              <Heading as="h3" size="md" mb={2}>
                Description
              </Heading>
              <Expandabletext>{book.description}</Expandabletext>
            </Box>
          )}

          <HStack spacing={4} mt={4}>
            <Text fontSize="2xl" fontWeight="bold" color="green.400">
              ${book.sellingPrice}
            </Text>
            <Button
              colorScheme="blue"
              size="lg"
              leftIcon={<FiShoppingCart />}
              borderRadius="full"
              onClick={() => addbooktocart.mutate()}
            >
              {addBooktocartIsPending ? "Adding to Cart..." : "Add to Cart"}
            </Button>
          </HStack>
        </VStack>
      </GridItem>
      <GridItem>
        <Image
          src={book.photoUrl || "/default-book-cover.jpg"}
          alt={book.title}
          borderRadius="md"
          shadow="lg"
          width="100%"
          maxW="370px"
        />
      </GridItem>
    </SimpleGrid>
  );
};

export default Bookdetailpage;
