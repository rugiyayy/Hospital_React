import { Button, extendTheme } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function Helper(props) {
  const theme = extendTheme({
    textStyles: {
      a: {
        fontSize: props.fontSize,
        fontWeight: "700",
        color: "white",
        bg: props.bgColor,
        marginTop: "12px",
        borderRadius: "20px",
        padding: "24px 16px",
        _hover: {
          bg: props.bgHover,
        },
        transition: ".6s ease",
        textTransform: "uppercase",
        letterSpacing: "1px",
      },
    },
  });
  return (
    <Button gap="16px" sx={theme.textStyles.a}>
      {props.text}
      <FontAwesomeIcon icon={faChevronRight} />
    </Button>
  );
}

export { Helper };
