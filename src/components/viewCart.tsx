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
import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";
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
  const makepayment = async () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      toast({
        title: "Authentication Error",
        description: "Please log in to continue.",
        status: "error",
      });
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/api/payments/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || `Server error: ${response.status}`);
      }

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL received from server.");
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      toast({
        title: "Checkout Error",
        description: err.message || "Could not initiate payment.",
        status: "error",
      });
    }
  };
  // Updated Success Effect
  useEffect(() => {
    if (removeIsSuccess) {
      toast({ title: "Book removed successfully!", status: "success" });
    }
    if (modifyIsSuccess) {
      toast({ title: "Quantity updated!", status: "success" });
    }
  }, [removeIsSuccess, modifyIsSuccess]);

  return (
    <Box marginLeft={8}>
      <SimpleGrid columns={2} spacing={4} mt={6} >
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
          onClick={() => {
            makepayment();
          }}
        >
          Checkout
        </Button>
      </Box>
    </Box>
  );
};

export default ViewCart;
