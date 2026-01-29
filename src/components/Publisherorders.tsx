import useGetpendingOrders from "../hooks/useGetpendingOrders";
import PublisherOrderitem from "./publisherOrderitem";
import { Text } from "@chakra-ui/react";
const Publisherorders = () => {
  const { data, refetch } = useGetpendingOrders();
  return (
    <>
      {!data?.length && (
        <Text
          fontSize="xl"
          fontWeight="400"
          letterSpacing="tighter"
          color="blue.200"
        >
          No pending orders
        </Text>
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
