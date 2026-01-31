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
import { FiHash } from "react-icons/fi";
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
  // eslint-disable-next-line react-hooks/rules-of-hooks
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
      borderLeft="3px solid"
      borderRight="3px solid"
      borderColor="blue.200"
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
          <Heading fontSize="md" mb={6}>
            {title}
          </Heading>
          <HStack fontSize="xs" color="gray.600" mb={1}>
            <FiHash />
            <Text marginBottom="1px">ISBN : {isbn}</Text>
          </HStack>
          <HStack fontSize="xs" color="gray.600" mb={1}>
            <FiHash />
            <Text marginBottom="1px">Category : {category}</Text>
          </HStack>
          <Text fontSize="sm" fontWeight="bold" color="blue.600" mb={1}>
            Total sold : ${total_sold}
          </Text>
        </Box>
      </CardBody>
    </Card>
  );
};
export default topSellingBookItem;
