import {
  Card,
  CardBody,
  VStack,
  Spinner,
  HStack,
  Text,
  Box,
  SimpleGrid,
  Input,
  Icon,
  Heading,
  Image,
} from "@chakra-ui/react";
import useGettop10sellingbooks from "../hooks/useGettop10sellingbooks";
import useGettop5customers from "../hooks/useGettop5customers";
import useGettotalsalesbymonthreport from "../hooks/useGettotalsalesmonthreport";
import TopSellingBookItem from "./topsellingbookitem";
import { useState } from "react";
import useGettotalsalesbydayreport from "../hooks/useGettotalsalesdayreport";
import useGetnumberofbooksordered from "../hooks/useGetnumberofbooksordered";
import {
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiHash,
  FiBookOpen,
  FiPackage,
  FiShoppingCart,
  FiUser,
  FiAward,
} from "react-icons/fi";
import useGetGoogleBooks from "../hooks/useGetgooglebooksapi";
const Reports = () => {
  const [searchValue, setSearchValue] = useState("");
  const [selectedIsbn, setSelectedIsbn] = useState("");
  const { data: topsellingbooks } = useGettop10sellingbooks();
  const { data: topcustomer } = useGettop5customers();
  const { data: totalsalesmonth } = useGettotalsalesbymonthreport();
  const { data: totalsalesday } = useGettotalsalesbydayreport(searchValue);
  const { data: numberofbooksordered } =
    useGetnumberofbooksordered(selectedIsbn);
  const { data } = useGetGoogleBooks(numberofbooksordered?.book_Title || "");
  if (!topcustomer || !topsellingbooks || !totalsalesmonth) {
    return (
      <HStack direction="row" align="center" spacing={3} padding={5}>
        <Spinner size="lg" color="blue.400" />
        <Text paddingLeft="2px" color="blue.400" marginTop="10px">
          Loading System reports...
        </Text>
      </HStack>
    );
  }
  return (
    <>
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
        marginLeft={10}
        width="1120px"
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <HStack mb={4}>
                <Icon as={FiTrendingUp} boxSize={6} color="blue.500" />
                <Heading fontSize="xl" fontWeight="bold">
                  Top 10 Selling Books
                </Heading>
              </HStack>
              <Text
                fontSize="sm"
                color="gray.500"
                mb={2}
                marginTop={-5}
                marginLeft={9}
              >
                (Last 3 Months Performance)
              </Text>
              <SimpleGrid columns={2} spacing={4} mt={6} height={200}>
                {topsellingbooks.map((item) => (
                  <TopSellingBookItem key={item.isbn} {...item} />
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </CardBody>
      </Card>
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
        marginLeft={10}
        width="1120px"
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <HStack mb={4}>
                <Icon
                  as={FiCalendar}
                  boxSize={6}
                  color="green.500"
                  marginTop={-2}
                />
                <Heading fontSize="xl" fontWeight="bold">
                  Previous Month Sales Report
                </Heading>
              </HStack>
              <Text fontSize="sm" color="gray.500" mb={2} marginTop={-2}>
                Total revenue from book sales
              </Text>
              <SimpleGrid columns={2} spacing={4} mt={6}>
                {totalsalesmonth.map((item) => (
                  <Box>
                    <VStack align="stretch" spacing={2}>
                      <HStack fontSize="sm" color="gray.500">
                        <Icon as={FiCalendar} color="blue.400" marginTop={-6} />
                        <Text fontWeight="medium" marginTop={-3}>
                          From : {item.from_date} to : {item.to_date}
                        </Text>
                      </HStack>
                    </VStack>
                    <HStack marginTop={-2}>
                      <Icon as={FiDollarSign} color="green.500" />
                      <Text fontWeight="medium" marginBottom="1px">
                        Total Sales : ${item.total_revenue}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </CardBody>
      </Card>
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
        marginLeft={10}
        width="1120px"
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <HStack mb={4} marginTop={-2}>
                <Icon as={FiUsers} boxSize={6} color="purple.500" />
                <Heading fontSize="xl" fontWeight="bold">
                  Top 5 Customers
                </Heading>
              </HStack>
              <Text fontSize="sm" color="gray.500" mb={2} marginTop={-2}>
                (Highest Spending in Last 3 Months)
              </Text>
              <SimpleGrid columns={2} spacing={4} mt={6}>
                {topcustomer.map((item) => (
                  <Box>
                    <VStack align="stretch" spacing={2} marginTop={-3}>
                      <HStack fontSize="sm" color="gray.500">
                        <Icon as={FiUser} color="blue.400" />
                        <Text fontWeight="medium" marginBottom="1px">
                          Customer Name : {item.username}
                        </Text>
                      </HStack>
                      <HStack fontSize="sm" color="gray.500">
                        <Icon as={FiUser} color="purple.400" />
                        <Text fontWeight="medium" marginBottom="1px">
                          First Name : {item.first_name}
                        </Text>
                      </HStack>
                      <HStack fontSize="sm" color="gray.500">
                        <Icon as={FiUser} color="purple.400" />
                        <Text fontWeight="medium" marginBottom="1px">
                          Last Name : {item.last_name}
                        </Text>
                      </HStack>
                    </VStack>
                    <HStack marginTop={2} marginBottom={2}>
                      <Icon as={FiAward} color="orange.500" />
                      <Text fontWeight="medium" marginTop={3}>
                        Total Spent : ${item.total_spent}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </CardBody>
      </Card>
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
        marginLeft={10}
        width="1120px"
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <HStack mb={4}>
                <Icon as={FiDollarSign} boxSize={6} color="orange.500" />
                <Heading fontSize="xl" fontWeight="bold" marginTop={1}>
                  Daily Sales Report
                </Heading>
              </HStack>
              <Text
                fontSize="sm"
                color="gray.500"
                mb={2}
                marginLeft={2}
                marginTop={-2}
              >
                Select a date to view sales
              </Text>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{ maxWidth: "150px" }}
                  borderRadius="full"
                  _hover={{ transform: "scale(1.05)" }}
                />
              </div>
              <SimpleGrid
                columns={2}
                spacing={4}
                mt={6}
                marginLeft={4}
                marginTop={4}
              >
                {totalsalesday?.map((item) => (
                  <Box>
                    <VStack align="stretch" spacing={2}>
                      <HStack fontSize="sm" color="gray.500">
                        <Icon as={FiCalendar} color="blue.400" />
                        <Text fontWeight="medium" marginBottom="1px">
                          On Day : {item.on_day}
                        </Text>
                      </HStack>
                    </VStack>
                    <HStack>
                      <Icon as={FiDollarSign} color="green.500" />
                      <Text fontWeight="medium" marginBottom="1px">
                        Total Sales : ${item.total_sales}
                      </Text>
                    </HStack>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </CardBody>
      </Card>
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
        marginLeft={10}
        width="1120px"
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <HStack mb={4}>
                <Icon as={FiBookOpen} boxSize={6} color="blue.500" />
                <Heading fontSize="xl" fontWeight="bold">
                  Number of times a book ordered
                </Heading>
              </HStack>
              <Text
                fontSize="sm"
                color="gray.500"
                mb={2}
                marginLeft={2}
                marginTop={-2}
              >
                Enter ISBN to view book order statistics
              </Text>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Input
                  type="text"
                  placeholder="Enter ISBN"
                  aria-label="ISBN Search"
                  value={selectedIsbn}
                  onChange={(e) => setSelectedIsbn(e.target.value)}
                  style={{ maxWidth: "150px" }}
                  borderRadius="full"
                  marginLeft={2}
                  _hover={{ transform: "scale(1.05)" }}
                />
              </div>
              <SimpleGrid columns={1} spacing={4} mt={6} height={220}>
                {numberofbooksordered && (
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
                        src={
                          data?.items?.[0]?.volumeInfo?.imageLinks?.thumbnail
                        }
                        alt="Book cover"
                        height="100%"
                        objectFit="cover"
                        width="100%"
                      />
                    </Box>
                    <CardBody
                      flex="1"
                      display="flex"
                      flexDirection="column"
                      p={8}
                    >
                      <Heading fontSize="lg" mb={4}>
                        {numberofbooksordered?.book_Title}
                      </Heading>
                      <SimpleGrid columns={2} spacing={0}>
                        <HStack fontSize="xs" color="gray.600" mb={1}>
                          <FiHash />
                          <Text
                            marginBottom="1px"
                            fontSize="xs"
                            color="gray.500"
                          >
                            ISBN : {numberofbooksordered.book_isbn}
                          </Text>
                        </HStack>
                        <HStack fontSize="xs" color="gray.600" mb={1}>
                          <Icon as={FiPackage} color="green.500" />
                          <Text fontSize="xs" color="gray.500" marginTop={3}>
                            Restocks :
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="medium"
                            marginTop={3}
                            color="green.500"
                          >
                            {numberofbooksordered?.total_restocked_books}
                          </Text>
                        </HStack>
                        <HStack fontSize="xs" color="gray.600" mb={1}>
                          <Icon as={FiShoppingCart} color="blue.500" />
                          <Text fontSize="xs" color="gray.500" marginTop={4}>
                            Order Count :
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color="blue.600"
                            marginTop={4}
                          >
                            {numberofbooksordered?.order_count}
                          </Text>
                        </HStack>
                        <HStack fontSize="xs" color="gray.600" mb={1}>
                          <Icon as={FiDollarSign} color="orange.500" />
                          <Text fontSize="xs" color="gray.500" marginTop={3}>
                            Total Spent :
                          </Text>
                          <Text
                            fontSize="sm"
                            fontWeight="bold"
                            color="orange.600"
                            marginTop={3}
                          >
                            ${numberofbooksordered?.total_spent}
                          </Text>
                        </HStack>
                      </SimpleGrid>
                    </CardBody>
                  </Card>
                )}
              </SimpleGrid>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default Reports;
