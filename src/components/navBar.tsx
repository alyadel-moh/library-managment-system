import { HStack, Text, useColorModeValue } from "@chakra-ui/react";
import SearchInput from "./SearchInput";
import Colormodeswitch from "./Colormodeswitch";

const navBar = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const bgColor = useColorModeValue("white", "gray.800");

  return (
    <HStack
      padding="10px"
      spacing="15px"
      shadow="md"
      position="sticky"
      top="0"
      bg={bgColor}
      zIndex="10"
    >
      <Text
        fontSize="2xl"
        fontWeight="900"
        letterSpacing="tighter"
        color="blue.200"
        marginBottom="4px"
      >
        Book
      </Text>
      <Text
        fontSize="2xl"
        whiteSpace="nowrap"
        fontWeight="300"
        marginLeft="-9px"
        marginBottom="4px"
      >
        shelf
      </Text>
      <SearchInput />
      <Colormodeswitch />
    </HStack>
  );
};

export default navBar;
