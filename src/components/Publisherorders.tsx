import useGetpendingOrders from "../hooks/useGetpendingOrders";
import PublisherOrderitem from "./publisherOrderitem";
import { HStack, Spinner, Text } from "@chakra-ui/react";
const Publisherorders = () => {
  const { data, refetch } = useGetpendingOrders();
  return (
    <>
      {!data?.length && (
        <HStack direction="row" align="center" spacing={3} padding={5}>
          <Spinner size="lg" color="blue.400" />
          <Text paddingLeft="2px" color="blue.400" marginTop="10px">
            Loading System reports...
          </Text>
        </HStack>
      )}
      {data?.map((order) => (
        <PublisherOrderitem
          key={order.orderId}
          {...order}
          onConfirm={refetch}
        />
      ))}
    </>
  );
};
export default Publisherorders;
