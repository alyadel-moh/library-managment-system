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
} from "@chakra-ui/react";
import useGettop10sellingbooks from "../hooks/useGettop10sellingbooks";
import useGettop5customers from "../hooks/useGettop5customers";
import useGettotalsalesbymonthreport from "../hooks/useGettotalsalesmonthreport";
import TopSellingBookItem from "./topsellingbookitem";
import { useState } from "react";
import useGettotalsalesbydayreport from "../hooks/useGettotalsalesdayreport";
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
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                Top 10 Selling Books (For the Last 3 Months)
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
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                The total sales for books in the previous month
              </Text>
              <SimpleGrid columns={2} spacing={4} mt={6}>
                {totalsalesmonth.map((item) => (
                  <Box>
                    <VStack align="stretch" spacing={2}>
                      <HStack fontSize="sm" color="gray.500">
                        <Text fontWeight="medium" marginBottom="1px">
                          From : {item.from_date} to : {item.to_date}
                        </Text>
                      </HStack>
                    </VStack>
                    <Text fontWeight="medium" marginBottom="1px">
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
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                TOP 5 Customers (For the Last 3 Months)
              </Text>
              <SimpleGrid columns={2} spacing={4} mt={6}>
                {topcustomer.map((item) => (
                  <Box>
                    <VStack align="stretch" spacing={2}>
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
                    <Text fontWeight="medium" marginBottom="1px">
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
      >
        <CardBody p={8}>
          <VStack align="stretch" spacing={2}>
            <Box>
              <Text fontSize="md" fontWeight="bold" mb={2}>
                The total sales for books on a certain day
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
              <SimpleGrid columns={2} spacing={4} mt={6}>
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
