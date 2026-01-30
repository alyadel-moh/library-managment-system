import useGetpendingOrders from "../hooks/useGetpendingOrders";
import PublisherOrderitem from "./publisherOrderitem";
import {Text } from "@chakra-ui/react";
const Publisherorders = () => {
  const { data, refetch } = useGetpendingOrders();
  return (
    <>
      {!data?.length && (
          <Text paddingLeft="2px" color="blue.400" marginTop="10px">
            No Pending Orders...
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
