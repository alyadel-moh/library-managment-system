import { InputGroup, Input, InputLeftElement } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

const SearchInput = () => {
  const ref = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const handleSearch = () => {
    const query = ref.current?.value;
    if (query) {
      const isAdminPage = location.pathname.includes("Adminpage");
      const targetPath = isAdminPage ? "/Adminpage" : "/homepage";
      navigate(`${targetPath}?search=${encodeURIComponent(query)}`);
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
      }}
    >
      <InputGroup _hover={{ transform: "scale(1.01)" }}>
        <InputLeftElement children={<BsSearch />} />
        <Input
          ref={ref}
          borderRadius={20}
          placeholder="search by title, author, or publisher"
          variant="filled"
        />
      </InputGroup>
    </form>
  );
};

export default SearchInput;
