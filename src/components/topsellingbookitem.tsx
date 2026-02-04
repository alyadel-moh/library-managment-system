import {
  Card,
  Box,
  CardBody,
  HStack,
  Heading,
  Image,
  Text,
  Icon,
} from "@chakra-ui/react";
import { FiHash, FiTag, FiShoppingBag } from "react-icons/fi";
interface Top10sellingbooksResponse {
  isbn: string;
  category: string;
  title: string;
  total_sold: number;
}
const topSellingBookItem = ({
  isbn,
  category,
  title,
  total_sold,
}: Top10sellingbooksResponse) => {
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
      height="170px"
    >
      <Box width="150px" flexShrink={0} bg="gray.50">
        <Image
          src={`https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg?default=false`}
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
            {title}
          </Heading>
          <HStack fontSize="xs" color="gray.600" mb={1}>
            <Icon as={FiHash} />
            <Text marginBottom="1px">ISBN : {isbn}</Text>
          </HStack>
          <HStack fontSize="xs" color="gray.600" mt={2}>
            <Icon as={FiTag} color="purple.500" />
            <Text marginBottom="1px">Category : {category}</Text>
          </HStack>
          <HStack fontSize="xs" mb={1}>
            <Icon as={FiShoppingBag} color="green.500" />
            <Text
              fontSize="sm"
              fontWeight="bold"
              color="blue.600"
              marginTop={3}
            >
              Total sold : {total_sold} units
            </Text>
          </HStack>
        </Box>
      </CardBody>
    </Card>
  );
};
export default topSellingBookItem;
