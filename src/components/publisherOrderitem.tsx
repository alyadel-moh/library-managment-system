interface order {
  orderId: number;
  publisherAddress: string;
  threshold: number;
  sellingPrice: number;
  stockQuantity: number;
  title: number;
  status: string;
  orderDate: string;
  quantity: number;
  publisherName: string;
  isbn: string;
  totalOrderPrice: number;
  onConfirm?: () => void;
}
import useConfirmOrder from "../hooks/useConfirmOrder";
import {
  Card,
  CardBody,
  Box,
  HStack,
  Heading,
  Text,
  Badge,
  VStack,
  Divider,
  Button,
  useToast,
} from "@chakra-ui/react";
import {
  FiShoppingBag,
  FiCalendar,
  FiPackage,
  FiDollarSign,
  FiMapPin,
  FiHash,
  FiBook,
  FiTrendingUp,
  FiBox,
  FiCheckCircle,
  FiUser,
} from "react-icons/fi";
import { useEffect } from "react";
const publisherOrderitem = ({
  orderId,
  publisherAddress,
  threshold,
  sellingPrice,
  stockQuantity,
  title,
  status,
  orderDate,
  quantity,
  publisherName,
  isbn,
  totalOrderPrice,
  onConfirm,
}: order) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { mutateAsync, data, error, isPending } = useConfirmOrder();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (data) {
      toast({
        title: data?.message,
        status: "success",
      });
    }
  }, [data]);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (error) {
      toast({
        title: error?.response?.data?.message,
        status: "error",
      });
    }
  }, [error]);
  return (
    <Card
      display="flex"
      flexDirection="column"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.02)", boxShadow: "xl" }}
      overflow="hidden"
      mb={4}
      borderRadius="3xl"
      borderLeft="3px solid"
      borderRight="3px solid"
      borderColor="blue.200"
    >
      <CardBody p={8}>
        <VStack align="stretch" spacing={2}>
          {/* Header Section */}
          <Box>
            <HStack justifyContent="space-between" mb={3}>
              <HStack mb={2}>
                <FiShoppingBag size={20} color="#4299E1" />
                <Heading fontSize="xl" color="gray.800" marginBottom="1px">
                  Order #{orderId}
                </Heading>
              </HStack>
              <Badge
                colorScheme="orange"
                fontSize="sm"
                px={3}
                py={1}
                borderRadius="full"
              >
                <HStack spacing={1}>
                  <FiCheckCircle size={14} />
                  <Text marginBottom="1px">{status.toUpperCase()}</Text>
                </HStack>
              </Badge>
            </HStack>

            <HStack fontSize="sm" color="gray.500" mb={1}>
              <FiCalendar />
              <Text marginBottom="1px">Order Date: {orderDate}</Text>
            </HStack>
          </Box>
          <Divider />
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2}>
              Publisher Information
            </Text>
            <VStack align="stretch" spacing={2}>
              <HStack fontSize="sm" color="gray.500">
                <FiUser />
                <Text fontWeight="medium" marginBottom="1px">
                  Publisher :{" "}
                </Text>
                <Text color="gray.500" marginBottom="1px">
                  {publisherName}
                </Text>
              </HStack>
              <HStack fontSize="sm" color="gray.500">
                <FiMapPin />
                <Text fontWeight="medium" marginBottom="1px">
                  Address :
                </Text>
                <Text color="gray.500" marginBottom="1px">
                  {publisherAddress}
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Divider />
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2}>
              Book Details
            </Text>
            <VStack align="stretch" spacing={2}>
              <HStack fontSize="sm" color="gray.500">
                <FiBook />
                <Text fontWeight="medium" marginBottom="1px">
                  Title:
                </Text>
                <Text color="gray.500" marginBottom="1px">
                  {title}
                </Text>
              </HStack>
              <HStack fontSize="sm" color="gray.500">
                <FiHash />
                <Text fontWeight="medium" marginBottom="1px">
                  ISBN:
                </Text>
                <Text color="gray.500" marginBottom="1px">
                  {isbn}
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Divider />

          {/* Order Details */}
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2}>
              Order Details
            </Text>
            <VStack align="stretch" spacing={2}>
              <HStack fontSize="sm" color="gray.500">
                <FiPackage />
                <Text fontWeight="medium" marginBottom="1px">
                  Order Quantity:
                </Text>
                <Text color="orange.600" fontWeight="bold" marginBottom="1px">
                  {quantity}
                </Text>
              </HStack>
              <HStack fontSize="sm" color="gray.500">
                <FiBox />
                <Text fontWeight="medium" marginBottom="1px">
                  Stock Quantity:
                </Text>
                <Text color="blue.600" fontWeight="bold " marginBottom="1px">
                  {stockQuantity}
                </Text>
              </HStack>
              <HStack fontSize="sm" color="gray.500">
                <FiTrendingUp />
                <Text fontWeight="medium" marginBottom="1px">
                  Threshold:
                </Text>
                <Text color="red.500" fontWeight="bold" marginBottom="1px">
                  {threshold}
                </Text>
              </HStack>
            </VStack>
          </Box>

          <Divider />

          {/* Pricing Information */}
          <Box>
            <Text fontSize="md" fontWeight="bold" mb={2}>
              Pricing
            </Text>
            <VStack align="stretch" spacing={2}>
              <HStack fontSize="sm" color="gray.500">
                <FiDollarSign />
                <Text fontWeight="medium" marginBottom="1px">
                  Selling Price:
                </Text>
                <Text color="blue.600" fontWeight="bold" marginBottom="1px">
                  ${sellingPrice}
                </Text>
              </HStack>
              <Divider />
              <HStack fontSize="md" color="green.600" p={1} borderRadius="md">
                <Text fontWeight="bold" marginBottom="1px">
                  Total Order Price :
                </Text>
                <Text
                  color="green.600"
                  fontWeight="bold"
                  fontSize="lg"
                  marginBottom="1px"
                >
                  ${totalOrderPrice}
                </Text>
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  paddingLeft="731px"
                >
                  <Button
                    colorScheme="blue"
                    borderRadius="full"
                    size="md"
                    leftIcon={<FiCheckCircle />}
                    onClick={() =>
                      mutateAsync(orderId).then(() => {
                        if (onConfirm) {
                          onConfirm();
                        }
                      })
                    }
                    isDisabled={status === "confirmed"}
                  >
                    {isPending ? "Confirming..." : "Confirm Order"}
                  </Button>
                </Box>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default publisherOrderitem;
