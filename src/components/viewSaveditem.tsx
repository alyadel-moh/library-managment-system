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
import { FiEye, FiTrash2 } from "react-icons/fi";
import type Book1 from "../entities/Book";
interface Item {
  book: Book1;
  onRemove: () => void;
  isremove?: boolean;
  onViewChange: (book: Book1) => void;
}
const ViewSaveditem = ({ book, onRemove, isremove, onViewChange }: Item) => {
  return (
    <Card
      display="flex"
      flexDirection="row"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.02)" }}
      overflow="hidden"
      mb={4}
      borderRadius="3xl"
      borderLeft="3px solid"
      borderRight="3px solid"
      borderColor="blue.200"
      marginLeft={6}
    >
      <Box width="150px" flexShrink={0} bg="gray.50">
        <Image
          src={book.photoUrl || ""}
          alt="Book cover"
          height="100%"
          objectFit="cover"
          width="100%"
        />
      </Box>
      <CardBody
        flex="1"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p={8}
      >
        <Box>
          <Heading fontSize="md" mb={6}>
            {book.title}
          </Heading>
          <Text fontSize="sm" fontWeight="bold" color="blue.600" mb={1}>
            ${book.sellingPrice}
          </Text>
          <HStack fontSize="xs" fontWeight="semibold">
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
        </Box>
        <VStack spacing={2}>
          <Button
            colorScheme="blue"
            size="sm"
            leftIcon={<FiEye />}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            borderRadius="full"
            width="180px"
            onClick={() => onViewChange(book)}
          >
            View Details
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            onClick={onRemove}
            transition="all 0.2s"
            _hover={{ transform: "scale(1.05)" }}
            borderRadius="full"
            leftIcon={<FiTrash2 />}
            width="180px"
          >
            {isremove ? "Removing..." : "Remove"}
          </Button>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ViewSaveditem;
