// Chakra imports
import "../assets/styles/reset.module.scss";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import BgSignUp from "../assets/img/bg1.avif";
import React from "react";
import { NavLink } from "react-router-dom";

function SignUp() {
  const textColor = useColorModeValue("gray.700", "white");
  const bgForm = useColorModeValue("white", "navy.700");
  return (
    <Flex position="relative">
      <Flex
        minH={{ md: "1000px" }}
        h={{ sm: "initial", md: "75vh", lg: "85vh" }}
        w="100%"
        maxW="1044px"
        mx="auto"
        justifyContent="space-between"
        mb="50px"
        pt={{ md: "0px" }}
      >
        <Flex
          w="100%"
          h="100%"
          alignItems="center"
          justifyContent="center"
          mb="60px"
          mt={{ base: "50px", md: "-100px" }}
        >
          <Flex
            position="absolute"
            top="6"
            zIndex="2"
            direction="column"
            w="445px"
            background="transparent"
            borderRadius="15px"
            p="40px"
            mx={{ base: "100px" }}
            m={{ base: "20px", md: "auto" }}
            bg={bgForm}
            boxShadow={useColorModeValue(
              "0px 5px 14px rgba(0, 0, 0, 0.05)",
              "unset"
            )}
          >
            <Text
              margin="-8px 0 10px 0"
              textAlign="center"
              fontSize="4xl"
              color={textColor}
              fontWeight="bold"
            >
              Welcome!
            </Text>
            <Text
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              textAlign="center"
              mb="22px"
            >
              Sign Up
            </Text>

            <FormControl>
              <FormLabel
                ms="4px"
                fontSize="15px"
                fontWeight="normal"
                fontFamily="sans-serif"
              >
                Full Name
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                type="text"
                placeholder="Your full name"
                mb="24px"
                size="lg"
                width="98%"
                border="1px"
                borderColor="gray.200"
              />

              <FormLabel
                ms="4px"
                fontSize="15px"
                fontWeight="normal"
                fontFamily="sans-serif"
              >
                Email
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                type="email"
                placeholder="Your full name"
                mb="24px"
                size="lg"
                width="98%"
                border="1px"
                borderColor="gray.200"
              />

              <FormLabel
                ms="4px"
                fontSize="15px"
                fontWeight="normal"
                fontFamily="sans-serif"
              >
                Password
              </FormLabel>
              <Input
                fontSize="sm"
                ms="4px"
                type="password"
                placeholder="Your password"
                mb="24px"
                size="lg"
                width="98%"
                border="1px"
                borderColor="gray.200"
              />
              <FormControl display="flex" alignItems="center" mb="24px">
                <Switch id="remember-login" colorScheme="blue" me="10px" />
                <FormLabel
                  htmlFor="remember-login"
                  mb="0"
                  fontWeight="normal"
                  fontFamily="sans-serif"
                >
                  Remember me
                </FormLabel>
              </FormControl>
              <Button
                textAlign="center"
                left="82px"
                fontSize="16px"
                variant="dark"
                fontWeight="bold"
                w="50%"
                h="45"
                color="white"
                _hover={{
                  background: "green.500",
                }}
                mb="24px"
                backgroundColor="green"
              >
                SIGN UP
              </Button>
            </FormControl>
            <Flex
              justifyContent="center"
              alignItems="center"
              maxW="100%"
              mt="0px"
              
            >
              <Text color={textColor} fontWeight="medium">
                 Already have an account? 
                <NavLink to="/signIn" as="span">
                  <Button
                    fontSize="sm"
                    ms="5px"
                    px="0px"
                    me={{ sm: "2px", md: "16px" }}
                    variant="no-effects"
                    verticalAlign="0px"
                  >
                    <Text>Sign in</Text>
                  </Button>
                </NavLink>
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Box
          overflow="hidden"
          h="110%"
          w="100%"
          left="0px"
          top="-40%"
          position="absolute"
          bgImage={BgSignUp}
        >
          <Box
            w="100%"
            h="200%"
            bgSize="cover"
            bg="gray.900"
            opacity="0.7"
          ></Box>
        </Box>
      </Flex>
    </Flex>
  );
}

export default SignUp;
