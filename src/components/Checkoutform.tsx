import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod/dist/zod.js";
import { useForm } from "react-hook-form";
import useCardcheckout from "../hooks/useCardcheckout";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  FiCreditCard,
  FiCalendar,
  FiLock,
  FiCheckCircle,
} from "react-icons/fi";
import { useEffect } from "react";
const schema = z.object({
  cardNumber: z.string().min(1, { message: "Card number is required" }),
  expiryDate: z.string().min(1, { message: "Expiry date is required" }),
  cvv: z.string().min(1, { message: "CVV is required" }),
});
type formdata = z.infer<typeof schema>;

interface CheckoutformProps {
  expectedTotal: string;
}

const Form = ({ expectedTotal }: CheckoutformProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors }, // is valid for disabelling submit buttton and formsate used for displaying error messages
  } = useForm<formdata>({ resolver: zodResolver(schema) }); // manage form state errors validations submissionhandling i mean it builds and validate form
  const cardcheckout = useCardcheckout();
  const toast = useToast({
    position: "bottom-right",
    duration: 4000,
    isClosable: true,
  });
  const { isSuccess, isError, error, data } = cardcheckout;
  useEffect(() => {
    if (isSuccess && data) {
      toast({
        title: "Checkout Successful",
        description: data?.message,
        status: "success",
      });
    }
  }, [isSuccess, data, toast]);

  useEffect(() => {
    if (isError && error) {
      toast({
        title: "Checkout Failed",
        description: error?.response?.data?.message,
        status: "error",
      });
    }
  }, [isError, error, toast]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        minHeight: "100vh",
        padding: "100px",
      }}
    >
      <form
        onSubmit={handleSubmit(async (data) => {
          await cardcheckout.mutateAsync({ ...data, expectedTotal });
        })}
        style={{
          width: "100%",
          maxWidth: "600px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <FormControl isInvalid={!!errors.cardNumber}>
          <FormLabel fontWeight="bold">Card Number</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={<FiCreditCard color="gray.300" />}
            />
            <Input
              pr="4.5rem"
              id="cardNumber"
              type="text"
              placeholder="Enter Card Number"
              {...register("cardNumber")}
              borderRadius="full"
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid={!!errors.expiryDate}>
          <FormLabel fontWeight="bold">Expiry Date</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={<FiCalendar color="gray.300" />}
            />
            <Input
              pr="4.5rem"
              id="expiryDate"
              type="text"
              placeholder="Enter the Expiry Date"
              {...register("expiryDate")}
              borderRadius="full"
            />
          </InputGroup>
        </FormControl>

        <FormControl isInvalid={!!errors.cvv}>
          <FormLabel fontWeight="bold">CVV</FormLabel>
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="none"
              children={<FiLock color="gray.300" />}
            />
            <Input
              pr="4.5rem"
              id="cvv"
              type="text"
              placeholder="Enter the CVV"
              {...register("cvv")}
              borderRadius="full"
            />
          </InputGroup>
        </FormControl>
        <Button
          type="submit"
          height="45px"
          paddingRight="18px"
          colorScheme="blue"
          size="2xl"
          fontSize="lg"
          leftIcon={<FiCheckCircle />}
          borderRadius="full"
          _hover={{ transform: "scale(1.05)" }}
        >
          Checkout
        </Button>
      </form>
    </div>
  );
};
export default Form;
