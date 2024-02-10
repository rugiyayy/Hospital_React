import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { useState } from "react";

const Pagination = ({ filteredData, perPage, page, setPage }) => {
  const totalPages = Math.ceil(filteredData.length / perPage);
  const isLastPage = page === totalPages;
  
  const handleNextPage = () => {
    if (filteredData.length > 0 && filteredData.length >= page * perPage) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <ButtonGroup >
      <Button
        _active={{
          bg: "#dddfe2",
          transform: "scale(0.98)",
          borderColor: "#bec3c9",
        }}
        _focus={{
          boxShadow:
            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
        onClick={handlePreviousPage}
        isDisabled={page === 1}
      >
        Previous Page
      </Button>
      <Button
        _active={{
          bg: "#dddfe2",
          transform: "scale(0.98)",
          borderColor: "#bec3c9",
        }}
        _focus={{
          boxShadow:
            "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
        }}
        onClick={handleNextPage}
        isDisabled={isLastPage}
      >
        Next Page
      </Button>
    </ButtonGroup>
  );
};

export default Pagination;
