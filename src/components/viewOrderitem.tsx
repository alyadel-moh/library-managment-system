import {
  Card,
  Box,
  CardBody,
  HStack,
  Heading,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { FiShoppingBag, FiCalendar } from "react-icons/fi";
import Item from "./item";

interface orderhistory {
  orderId: number;
  totalPrice: number;
  orderDate: string;
  items: Array<{
    isbn: string;
    title: string;
    unit_price: number;
    quantity: number;
    total_price_book: number;
  }>;
}
const ViewOrderItem = ({
  orderId,
  totalPrice,
  orderDate,
  items,
}: orderhistory) => {
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
      width="1120px"
      marginLeft={10}
    >
      <CardBody
        flex="1"
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        p={8}
      >
        <Box>
          <HStack mb={3}>
            <FiShoppingBag size={20} color="#4299E1" />
            <Heading fontSize="xl" color="gray.800" marginBottom="1px">
              Order #{orderId}
            </Heading>
          </HStack>
          <HStack fontSize="sm" color="green.600" mb={2}>
            <Text marginBottom="1px" fontWeight="bold" color="green.600">
              Total Price : ${totalPrice}
            </Text>
          </HStack>
          <HStack fontSize="sm" color="gray.600">
            <FiCalendar />
            <Text marginBottom="1px">Order Date: {orderDate}</Text>
          </HStack>
          <SimpleGrid columns={2} spacing={4} mt={6}>
            {items.map((item) => (
              <Item key={item.isbn} {...item} />
            ))}
          </SimpleGrid>
        </Box>
      </CardBody>
    </Card>
  );
};

export default ViewOrderItem;
