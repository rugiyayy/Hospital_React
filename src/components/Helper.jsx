import { Button, extendTheme, useToast } from "@chakra-ui/react";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

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
      <Link to="/appointment">{props.text}</Link>
      <FontAwesomeIcon icon={faChevronRight} />
    </Button>
  );
}

const useAuthentication = (userName) => {
  const [loggedIn, setLoggedIn] = useState(!!userName);
  const toast = useToast();

  useEffect(() => {
    if (!userName) {
      setLoggedIn(false);
      toast({
        title: "Logged Out",
        description: "You have been logged out.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
    }
  }, [userName, toast]);

  return loggedIn;
};



export { Helper, useAuthentication };
