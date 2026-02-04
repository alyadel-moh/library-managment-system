import {
  Box,
  Button,
  useToast,
  Text,
  Divider,
  SimpleGrid,
} from "@chakra-ui/react";
import useGetaddedbookstocart from "../hooks/useGetbooksaddedtocart";
import useModifyquantity from "../hooks/useModifybookquantity";
import useRemoveBookFromCart from "../hooks/useRemovebookfromcart";
import ViewCartItem from "./viewCartitem";
import {  useEffect, useState, useMemo } from "react";
import { FiCheckCircle } from "react-icons/fi";
import useMakepayment from "../hooks/useMakepayment";
const ViewCart = () => {
  const { data: addedBooks, refetch } = useGetaddedbookstocart();
  const [removingIsbn, setRemovingIsbn] = useState<string>("");
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const removeBook = useRemoveBookFromCart();
  const {
    data: removeData,
    isError: removeError,
    error: removeErrorMsg,
    isPending: removeIsPending,
    isSuccess: removeIsSuccess,
  } = removeBook;
  const modifyQuantity = useModifyquantity();
  const {
    data: modifyData,
    isError: modifyError,
    error: modifyErrorMsg,
    isSuccess: modifyIsSuccess,
  } = modifyQuantity;
  useEffect(() => {
    if (removeIsSuccess && removeData) {
      toast({
        title: "Book removed from cart successfully!",
        status: "success",
      });
    }
  }, [removeIsSuccess, removeData]);
  
  useEffect(() => {
    if (modifyIsSuccess && modifyData) {
      toast({
        title: "Book quantity updated successfully!",
        status: "success",
      });
    }
  }, [modifyIsSuccess, modifyData, toast]);
  
  useEffect(() => {
    if (removeError && removeErrorMsg) {
      toast({
        title: removeErrorMsg?.response?.data?.message || "Failed to remove book",
        status: "error",
      });
    }
  }, [removeError, removeErrorMsg]);
  
  useEffect(() => {
    if (modifyError && modifyErrorMsg) {
      toast({
        title: modifyErrorMsg?.response?.data?.message || "Failed to update quantity",
        status: "error",
      });
    }
  }, [modifyError, modifyErrorMsg]);
  const {
    mutate: makePayment,
    isPending: paymentPending,
    isError: paymentError,
    error: paymentErrorMsg,
  } = useMakepayment();
  useEffect(() => {
    if (paymentError) {
      toast({
        title: paymentErrorMsg?.message || "Could not initiate payment.",
        status: "error",
      });
    }
  }, [paymentError]);

  // Memoize cart items to prevent unnecessary re-renders
  const cartItems = useMemo(() => addedBooks?.items || [], [addedBooks?.items]);
  
  return (
    <Box marginLeft={8}>
      <SimpleGrid columns={2} spacing={4} mt={6}>
        {cartItems.map((book) => (
          <ViewCartItem
            key={book.isbn}
            isbn={book.isbn}
            title={book.title}
            unitPrice={book.unitPrice}
            quantity={book.quantity}
            url={book.url || "/default-book-cover.jpg"}
            isremove={removingIsbn === book.isbn && removeIsPending}
            onRemove={() => {
              setRemovingIsbn(book.isbn);
              removeBook.mutate(book.isbn, {
                onSuccess: () => {
                  refetch();
                },
              });
            }}
            onUpdateQuantity={(newQuantity: number) => {
              modifyQuantity.mutate({ isbn: book.isbn, quantity: newQuantity }, {
                onSuccess: () => {
                  refetch();
                },
              });
            }}
          />
        ))}
      </SimpleGrid>

      <Divider marginLeft={3} />

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
        px={4}
      >
        <Box>
          <Text fontSize="lg" fontWeight="bold">
            Total Items : {addedBooks?.totalItems || 0}
          </Text>
          <Text fontSize="xl" fontWeight="bold" color="blue.600">
            Total Price : ${addedBooks?.totalCartPrice || "0.00"}
          </Text>
        </Box>
      </Box>

      <Box display="flex" justifyContent="center" mt={6}>
        <Button
          height="45px"
          paddingX="30px"
          colorScheme="blue"
          size="lg"
          fontSize="lg"
          width="400px"
          borderRadius="full"
          transition="all 0.2s"
          _hover={{ transform: "scale(1.05)" }}
          leftIcon={<FiCheckCircle />}
          isLoading={paymentPending}
          isDisabled={!addedBooks?.items?.length || paymentPending}
          onClick={() => {
            makePayment();
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ViewCart;
