import { Box, HStack, useRadio, useRadioGroup, Text } from "@chakra-ui/react";
interface categoryProps {
  onViewChange: (view: string) => void;
}
function SegmentItem(props: any) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();
  return (
    <Box as="label" width="auto">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="0px"
        borderRadius="3xl"
        height="45px"
        _checked={{
          bg: "blue.400",
          color: "white",
          shadow: "md",
        }}
        _focus={{
          boxShadow: "outline",
        }}
        px={4}
        py={2}
        textAlign="center"
        transition="all 0.2s"
        width="auto"
        minW={0}
      >
        <Text fontWeight="medium">{props.label}</Text>
      </Box>
    </Box>
  );
}

const BrowseCategories = ({ onViewChange }: categoryProps) => {
  const options = [
    { value: "All Categories", label: "All Categories" },
    { value: "Art", label: "Art" },
    { value: "History", label: "History" },
    { value: "Science", label: "Science" },
    { value: "Geography", label: "Geography" },
    { value: "Religion", label: "Religion" },
  ];

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: "framework",
    defaultValue: "All Categories",
    onChange: (value) => onViewChange(value),
  });

  const group = getRootProps();

  return (
    <HStack
      {...group}
      bg="transparent" // Make background transparent
      borderRadius="3xl"
      width="fit-content"
      minW="200px" // Optionally reduce min width
      marginTop="25px"
      height="55px"
    >
      {options.map((item) => {
        const radio = getRadioProps({ value: item.value });
        return <SegmentItem key={item.value} label={item.label} {...radio} />;
      })}
    </HStack>
  );
};

export default BrowseCategories;
