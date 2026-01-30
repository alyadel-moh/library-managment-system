/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  useToast,
} from "@chakra-ui/react";
import { CalendarIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import type { BookSearchCriteria } from "../hooks/useGetbook";
interface yearProps {
  setCriteria: (newCriteria: Partial<BookSearchCriteria>) => void;
}
const YearInput = ({ setCriteria }: yearProps) => {
  const toast = useToast({
    position: "bottom-right",
    duration: 3000,
    isClosable: true,
  });
  const [year, setYear] = useState("");
  const currentYear = new Date().getFullYear();
  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,4}$/.test(value)) {
      setYear(value);
    }
  };

  // Simple validation example
  const isInvalid =
    year.length === 4 &&
    (parseInt(year) < 1900 || parseInt(year) > currentYear);

  useEffect(() => {
    if (isInvalid) {
      toast({
        title: "Enter a valid year",
        status: "error",
      });
    }
  }, [isInvalid, toast]);
  return (
    <FormControl
      isInvalid={isInvalid}
      maxWidth="150px"
      marginLeft="670px"
      marginTop="-44px"
    >
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <CalendarIcon color="gray.300" />
        </InputLeftElement>
        <Input
          type="text"
          placeholder="YYYY"
          value={year}
          onChange={(e) => {
            handleChange(e);
            if (e.target.value.length === 4) {
              setCriteria({ publicationYear: e.target.value });
            }
          }}
          borderRadius={20}
        />
      </InputGroup>
    </FormControl>
  );
};
export default YearInput;
