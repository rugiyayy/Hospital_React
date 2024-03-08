import { Button, ButtonGroup } from "@chakra-ui/react";
import React, { useState } from "react";

const Pagination2 = ({
  totalCount,
  perPage,
  handleNextPage,
  handlePreviousPage,
  page,
}) => {
  return (
    <div>
      <ButtonGroup w="100%" margin="2rem 0 5rem" justifyContent="center">
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
          isDisabled={totalCount == perPage || totalCount <= perPage * page}
        >
          Next Page
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default Pagination2;
