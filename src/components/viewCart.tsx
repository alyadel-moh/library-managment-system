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
import {  useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
import useMakepayment from "../hooks/useMakepayment";
const ViewCart = () => {
  const { data: addedBooks, refetch } = useGetaddedbookstocart();
  const [removingIsbn, setRemovingIsbn] = useState<string>("");
  const [modifyingIsbn, setModifyingIsbn] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const removeBook = useRemoveBookFromCart(removingIsbn);
  const {
    data: removeData,
    isError: removeError,
    error: removeErrorMsg,
    isPending: removeIsPending,
    isSuccess: removeIsSuccess,
  } = removeBook;
  const modifyQuantity = useModifyquantity(quantity, modifyingIsbn);
  const {
    data: modifyData,
    isError: modifyError,
    error: modifyErrorMsg,
    isSuccess: modifyIsSuccess,
  } = modifyQuantity;
  useEffect(() => {
    if (removeData || modifyData) {
      toast({
        title: removeData
          ? "Book removed from cart successfully!"
          : "Book quantity updated successfully!",
        status: "success",
      });
    }
  }, [removeIsSuccess, modifyIsSuccess]);
  useEffect(() => {
    if (removeError || modifyError) {
      toast({
        title:
          removeErrorMsg?.response?.data?.message ||
          modifyErrorMsg?.response?.data?.message,
        status: "error",
      });
    }
  }, [removeError, modifyError]);
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

  return (
    <Box marginLeft={8}>
      <SimpleGrid columns={2} spacing={4} mt={6}>
        {addedBooks?.items?.map((book) => (
          <ViewCartItem
            key={book.isbn}
            isbn={book.isbn}
            title={book.title}
            unitPrice={book.unitPrice}
            quantity={book.quantity}
            isremove={removingIsbn === book.isbn && removeIsPending}
            onRemove={() => {
              setRemovingIsbn(book.isbn);
              removeBook.mutate(undefined, {
                onSuccess: () => {
                  refetch();
                },
              });
            }}
            onUpdateQuantity={(newQuantity: number) => {
              setModifyingIsbn(book.isbn);
              setQuantity(newQuantity);
              modifyQuantity.mutate(undefined, {
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
