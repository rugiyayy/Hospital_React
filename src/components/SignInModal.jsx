import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function SignInModal() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  return (
    <>
      <Button onClick={onOpen}>Sign In</Button>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            <Text as="h1" fontSize="28px" fontWeight="bold">
              Welcome!
            </Text>{" "}
            <Text as="p">Sign In </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>User name</FormLabel>
              <Input type="mail" ref={initialRef} placeholder="User name" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>
              <Input type="password" placeholder="Password" />
            </FormControl>
          </ModalBody>

          <ModalFooter gap="12px" flexDirection="column" margin="0 auto">
            <Button
              background="green"
              _hover={{ backgroundColor: "green.500" }}
              colorScheme="blue"
              mr={3}
            >
              Sign In
            </Button>

            <Flex gap="12px">
              Don't have an account?
              <NavLink to="/signup" as="span">
                <Text onClick={onClose}>Sign up</Text>
              </NavLink>
            </Flex>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
