import React from "react";
import { faCommentDots, faUser } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import syles from "../assets/styles/header.module.scss";

import {
  Box,
  Flex,
  Text,
  Link,
  List,
  ListItem,
  HStack,
  Button,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { NavLink } from "react-router-dom";
import Logo from "../assets/img/doctor-stethoscope-svgrepo-com (1).svg";
import SignIn from "../components/SignIn";
import SignInModal from "../components/SignInModal";
import { useDispatch, useSelector } from "react-redux";
import { logoutAction } from "../redux/slices/accountSlice";
const Header = () => {
  const { userName } = useSelector((x) => x.account);
  const dispatch = useDispatch();
  return (
    <header>
      <Box
        as="nav"
        width="100%"
        bg="#223a66"
        color="white"
        py="2"
        boxShadow="0 1px 2px rgba(0, 0, 0, 0.05)"
      >
        <div className={syles.container}>
          <Flex width="100%" justifyContent="space-between" align="center">
            <List
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              gap="36px"
            >
              <ListItem>
                <Link alignItems="center"
                  _hover={{ textDecoration: "none" }}
                  href="mailto:yolchiyeva.y1@gmail.com"
                  display="flex"
                  gap="10px"
                  
                >
                  <FontAwesomeIcon  icon={faCommentDots} />

                  <Text
                    fontWeight="600"
                    _hover={{ color: "black", transition: " .5s" }}
                  >
                    {" "}
                    support@novena.com
                  </Text>


                </Link>
              </ListItem>
              <ListItem
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap="8px"
              >
                <FontAwesomeIcon icon={faLocationDot} />
                <Text fontWeight="600"> Address Ta-134/A, New York, USA</Text>
              </ListItem>
            </List>

            <Flex justify="flex-end" alignItems="center" gap="32px">
              <Text fontWeight="bold" fontSize="md" mr="2">
                Call Now :
                <NavLink
                  _hover={{
                    textDecoration: "none",
                    color: "black",
                    transition: " .5s",
                  }}
                  fontSize="xl"
                  fontWeight="bold"
                  href="tel:+994554203509"
                >
                  {" "}
                  823-4565-13456
                </NavLink>
              </Text>

              <Box
                _hover={{ cursor: "pointer" }}
                display="flex"
                alignItems="center"
                gap="8px"
              >
                <FontAwesomeIcon icon={faUser} />

                <SignInModal name={"SignIn"} />
                {userName ? (
                  <Button
                    onClick={() => dispatch(logoutAction())}
                   
                  >
                    Log Out
                  </Button>
                ) : null}
              </Box>
            </Flex>
          </Flex>
        </div>
      </Box>

      <Box>
        <div className={syles.container}>
          <Flex
            marginTop="22px"
            width="100%"
            justifyContent="space-between"
            align="center"
          >
            <NavLink to="/">
              <img width="20%" src={Logo} />
            </NavLink>

            <HStack>
              <List
                fontSize="md"
                fontWeight="600"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                gap="36px"
              >
                <ListItem className={syles.nav_listItem}>
                  <NavLink
                    className={({ isActive }) => (isActive ? syles.active : "")}
                    to={"/"}
                  >
                    Home
                  </NavLink>
                </ListItem>
                {/* <ListItem className={syles.nav_listItem}>
                  <NavLink
                    className={({ isActive }) => (isActive ? syles.active : "")}
                    to={"/About"}
                  >
                    About
                  </NavLink>
                </ListItem>
                <ListItem className={syles.nav_listItem}>
                  <NavLink
                    className={({ isActive }) => (isActive ? syles.active : "")}
                    to={"/Services"}
                  >
                    Services
                  </NavLink>
                </ListItem> */}
                <ListItem className={syles.nav_listItem}>
                  <NavLink
                    className={({ isActive }) => (isActive ? syles.active : "")}
                    to={"/Department"}
                  >
                    Department
                  </NavLink>
                </ListItem>
                <ListItem className={syles.nav_listItem}>
                  <NavLink
                    className={({ isActive }) => (isActive ? syles.active : "")}
                    to={"/Doctors"}
                  >
                    Doctors
                  </NavLink>
                </ListItem>

                <ListItem className={syles.nav_listItem}>
                  <NavLink
                    className={({ isActive }) => (isActive ? syles.active : "")}
                    to={"/Contact"}
                  >
                    Contact
                  </NavLink>
                </ListItem>
                <ListItem className={syles.nav_listItem}>
                  <NavLink
                    className={({ isActive }) => (isActive ? syles.active : "")}
                    to={"/Appointment"}
                  >
                    Appointment
                  </NavLink>
                </ListItem>
              </List>
            </HStack>
          </Flex>
        </div>
      </Box>
    </header>
  );
};

export default Header;
