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
} from "@chakra-ui/react";
import useGettop10sellingbooks from "../hooks/useGettop10sellingbooks";
import useGettop5customers from "../hooks/useGettop5customers";
import useGettotalsalesbymonthreport from "../hooks/useGettotalsalesmonthreport";
import TopSellingBookItem from "./topsellingbookitem";
import { useState } from "react";
import useGettotalsalesbydayreport from "../hooks/useGettotalsalesdayreport";
import {
  FiTrendingUp,
  FiUsers,
  FiCalendar,
  FiDollarSign,
} from "react-icons/fi";
const Reports = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data: topsellingbooks } = useGettop10sellingbooks();
  const { data: topcustomer } = useGettop5customers();
  const { data: totalsalesmonth } = useGettotalsalesbymonthreport();
  const { data: totalsalesday } = useGettotalsalesbydayreport(searchValue);
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
              <SimpleGrid columns={2} spacing={4} mt={6}>
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
                        <Text fontWeight="medium" marginTop={-5}>
                          From : {item.from_date} to : {item.to_date}
                        </Text>
                      </HStack>
                    </VStack>
                    <Text fontWeight="medium" marginBottom="1px" marginTop={-2}>
                      Total Sales : ${item.total_revenue}
                    </Text>
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
                        <Text fontWeight="medium" marginBottom="1px">
                          Customer Name : {item.username}
                        </Text>
                      </HStack>
                      <HStack fontSize="sm" color="gray.500">
                        <Text fontWeight="medium" marginBottom="1px">
                          First Name : {item.first_name}
                        </Text>
                      </HStack>
                      <HStack fontSize="sm" color="gray.500">
                        <Text fontWeight="medium" marginBottom="1px">
                          Last Name : {item.last_name}
                        </Text>
                      </HStack>
                    </VStack>
                    <Text fontWeight="medium" marginTop={2} marginBottom={2}>
                      Total Spent : ${item.total_spent}
                    </Text>
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
                <Heading fontSize="xl" fontWeight="bold">
                  Daily Sales Report
                </Heading>
              </HStack>
              <Text fontSize="sm" color="gray.500" mb={2} marginLeft={2} marginTop={-2}>
                Select a date to view sales
              </Text>
              <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                <Input
                  type="date"
                  placeholder="YYYY-MM-DD"
                  aria-label="Search"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  style={{ maxWidth: "200px" }}
                />
              </div>
              <SimpleGrid columns={2} spacing={4} mt={6} marginLeft={4} marginTop={4}>
                {totalsalesday?.map((item) => (
                  <Box>
                    <VStack align="stretch" spacing={2}>
                      <HStack fontSize="sm" color="gray.500">
                        <Text fontWeight="medium" marginBottom="1px">
                          On Day : {item.on_day}
                        </Text>
                      </HStack>
                    </VStack>
                    <Text fontWeight="medium" marginBottom="1px">
                      Total Sales : ${item.total_sales}
                    </Text>
                  </Box>
                ))}
              </SimpleGrid>
            </Box>
          </VStack>
        </CardBody>
      </Card>
    </>
  );
};

export default Reports;
