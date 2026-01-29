import { HStack, Text } from "@chakra-ui/react";
import { Switch } from "@chakra-ui/react/switch";
import { useColorMode } from "@chakra-ui/react";
const Colormodeswitch = () => {
  const { toggleColorMode, colorMode } = useColorMode();

  return (
    <HStack>
      <Switch
        isChecked={colorMode === "dark"}
        colorScheme={"green"}
        onChange={toggleColorMode}
      ></Switch>
      <Text marginBottom="4px" fontWeight="bold" whiteSpace="nowrap">
        Dark Mode
      </Text>
    </HStack>
  );
};

export default Colormodeswitch;
