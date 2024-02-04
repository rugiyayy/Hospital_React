import React from "react";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

export const SearchBar = () => {
  return (
    <InputGroup w="50%" margin="0 auto">
      <InputLeftElement pointerEvents="none">
        <Search2Icon marginLeft={3} color="gray.600" />
      </InputLeftElement>
      <Input borderRadius="20px" type="text" placeholder="Search" />
    </InputGroup>
  );
};


