import React, { useState } from "react";
import {
  Box,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Text,
  HStack,
} from "@chakra-ui/react";
import type { BookSearchCriteria } from "../hooks/useGetbook";
interface priceProps {
  setCriteria: (newCriteria: Partial<BookSearchCriteria>) => void;
}
const PriceRangeSelector = ({ setCriteria }: priceProps) => {
  const [values, setValues] = useState([0, 1000]);
  return (
    <Box
      width="300px"
      p={4}
      borderWidth="1px"
      borderRadius="3xl"
      maxWidth="300px"
      marginLeft="870px"
      marginTop="-65px"
      height="95px"
    >
      <Text fontSize="md" fontWeight="bold" marginTop="-10px">
        Price Range
      </Text>

      <RangeSlider
        aria-label={["min", "max"]}
        defaultValue={[0, 1000]}
        min={0}
        max={1000}
        step={10}
        value={values}
        onChange={(val) => setValues(val)}
        onChangeEnd={(val) => {
          setCriteria({
            minPrice: val[0].toString(),
            maxPrice: val[1].toString(),
          });
        }}
        height="10px"
        marginTop="-60px"
      >
        <RangeSliderTrack bg="blue.100">
          <RangeSliderFilledTrack bg="blue.400" />
        </RangeSliderTrack>
        <RangeSliderThumb index={0} />
        <RangeSliderThumb index={1} />
      </RangeSlider>

      <HStack justifyContent="space-between" mt={4}>
        <Text fontSize="sm" marginTop="-20px">
          ${values[0]}
        </Text>
        <Text fontSize="sm" marginTop="-20px">
          ${values[1]}
        </Text>
      </HStack>
    </Box>
  );
};

export default PriceRangeSelector;
