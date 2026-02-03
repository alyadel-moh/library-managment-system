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
  IconButton,
  useToast,
} from "@chakra-ui/react";
import { FiBookmark, FiEye } from "react-icons/fi";
import useGetGoogleBooks from "../hooks/useGetgooglebooksapi";
import type Book1 from "../entities/Book";
import useAddBooktosavedbooks from "../hooks/useAddsavedbook";
import useGetUser from "../hooks/useGetusers";
import { useEffect } from "react";
interface BookcardProps {
  book: Book1;
  onViewDetails: (bookData: Book1) => void;
}
const Bookcard = ({ book, onViewDetails }: BookcardProps) => {
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const addbook = useAddBooktosavedbooks();
  const { data: user } = useGetUser();
  useEffect(() => {
    if (addbook.isSuccess) {
      toast({
        title: `Book has been added to saved books successfully`,
        status: "success",
      });
    }
  }, [addbook.isSuccess]);
  return (
    <Card
      height="100%"
      display="flex"
      flexDirection="column"
      transition="all 0.3s"
      borderRadius="3xl"
      overflow="hidden"
      borderBottom="1px solid"
      borderColor="blue.200"
    >
      <Box position="relative" overflow="hidden" bg="gray.50">
        {user?.role === "ROLE_CUSTOMER" && (
          <IconButton
            aria-label="Save book"
            icon={<FiBookmark style={{ transition: "all 0.2s" }} />}
            position="absolute"
            top={3}
            right={3}
            zIndex={2}
            colorScheme="blue"
            variant="solid"
            size="sm"
            borderRadius="full"
            boxShadow="md"
            onClick={(e) => {
              e.stopPropagation(); // Prevents triggering card clicks
              addbook.mutate(book.isbn);
            }}
            _hover={{ transform: "scale(1.1)" }}
          />
        )}
        <Image
          src={book.photoUrl}
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
        <Box flex="1">
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
        </Box>
      </CardBody>
    </Card>
  );
};

export default Bookcard;
