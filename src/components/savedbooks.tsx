import {
  Box,
  useToast,
  SimpleGrid,
  HStack,
  Spinner,
  Text,
  Divider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import useGetsavedbooks from "../hooks/useGetsavedbooks";
import useRemovesavedbook from "../hooks/userremovesavedbook";
import ViewSaveditem from "./viewSaveditem";
interface ViewSavedProps {
  onViewDetails: (book: any) => void;
}
const ViewSaved = ({ onViewDetails }: ViewSavedProps) => {
  const { data: addedBooks, refetch } = useGetsavedbooks();
  const [removingIsbn, setRemovingIsbn] = useState<string>("");
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const removeBook = useRemovesavedbook(removingIsbn);
  const {
    isError: removeError,
    error: removeErrorMsg,
    isPending: removeIsPending,
    isSuccess: removeIsSuccess,
  } = removeBook;
  useEffect(() => {
    if (removeIsSuccess) {
      toast({
        title: "Book removed from saved books successfully!",
        status: "success",
      });
    }
  }, [removeIsSuccess]);
  useEffect(() => {
    if (removeError) {
      toast({
        title: removeErrorMsg?.response?.data?.message,
        status: "error",
      });
    }
  }, [removeError]);
  if (!addedBooks) {
    return (
      <HStack direction="row" align="center" spacing={3} padding={5}>
        <Spinner size="lg" color="blue.400" />
        <Text paddingLeft="2px" color="blue.400" marginTop="10px">
          Loading Saved books...
        </Text>
      </HStack>
    );
  }
  return (
    <Box marginLeft={8}>
      <SimpleGrid columns={2} spacing={4} mt={6} height={200}>
        {addedBooks?.map((book) => (
          <ViewSaveditem
            key={book.isbn}
            book={book}
            onRemove={() => {
              setRemovingIsbn(book.isbn);
              removeBook.mutate(undefined, {
                onSuccess: () => {
                  refetch();
                },
              });
            }}
            isremove={removingIsbn === book.isbn && removeIsPending}
            onViewChange={onViewDetails}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ViewSaved;
