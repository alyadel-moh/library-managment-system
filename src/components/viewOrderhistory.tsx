import React from "react";
import useGetorderhistory from "../hooks/useGetorderhistory";
import ViewOrderItem from "./viewOrderitem";
import { Text } from "@chakra-ui/react";
const ViewOrderhistory = () => {
  const { data } = useGetorderhistory();
  return (
    <div>
      {!data?.length && (
        <Text
          fontSize="xl"
          fontWeight="400"
          letterSpacing="tighter"
          color="blue.200"
        >
          No Orders Found
        </Text>
      )}
      {data?.map((order) => (
        <ViewOrderItem {...order} />
      ))}
    </div>
  );
};

export default ViewOrderhistory;
