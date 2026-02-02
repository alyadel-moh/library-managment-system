import {
  Card,
  Box,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
} from "@chakra-ui/react";
import useGetGoogleBooks from "../hooks/useGetgooglebooksapi";
import { FiPackage, FiHash } from "react-icons/fi";

interface orderitem {
  isbn: string;
  title: string;
  unit_price: number;
  quantity: number;
  total_price_book: number;
}
const Item = ({
  isbn,
  title,
  unit_price,
  quantity,
  total_price_book,
}: orderitem) => {
  const { data } = useGetGoogleBooks(title);
  return (
    <Card
      display="flex"
      flexDirection="row"
      transition="all 0.3s"
      _hover={{ transform: "scale(1.02)" }}
      overflow="hidden"
      mb={4}
      borderRadius="3xl"
      maxWidth="2000px"
      bg="gray.800"
      borderLeft="2px solid"
      borderRight="2px solid"
      borderColor="blue.200"
      width="520px"
    >
      <Box width="150px" flexShrink={0} bg="gray.50">
        <Image
          src={data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail}
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
          <Heading fontSize="md" mb={4}>
            {title}
          </Heading>
          <HStack fontSize="sm" color="gray.600" mb={2}>
            <FiHash />
            <Text marginBottom="1px">ISBN: {isbn}</Text>
          </HStack>
          <HStack fontSize="sm" mb={2}>
            <FiPackage />
            <Text marginBottom="1px">Quantity: {quantity}</Text>
          </HStack>
          <Text fontSize="md" fontWeight="bold" color="blue.600" mb={2}>
            ${unit_price}
          </Text>
          <HStack fontSize="sm" fontWeight="bold" color="green.600">
            <Text marginBottom="1px">Total : ${total_price_book}</Text>
          </HStack>
        </Box>
      </CardBody>
    </Card>
  );
};

export default Item;
