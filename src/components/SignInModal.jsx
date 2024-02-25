import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
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
import React, { useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import useSignInModal from "../hooks/useSignInModal";
import { useSelector } from "react-redux";

export default function SignInModal(prop) {
  const { onOpen, isLoading, onClose, formik, isOpen } = useSignInModal();
  const { userName } = useSelector((x) => x.account);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      {userName ?? (
        <Button
          backgroundColor={prop.bg}
          color={prop.color}
          _hover={{ bg: prop.hoverBg, color: prop.hoverColor }}
          onClick={onOpen}
        >
          {prop.name}
        </Button>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
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
              <Input
                onChange={formik.handleChange}
                value={formik.values.userName}
                onBlur={formik.handleBlur}
                name="userName"
                type="mail"
                placeholder="Your Email Address"
              />
              {formik.errors.userName && formik.touched.userName && (
                <span style={{ color: "red" }}>{formik.errors.userName}</span>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Password</FormLabel>

              <InputGroup size="md">
                <Input
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  placeholder="Enter password"
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.errors.password && formik.touched.password && (
                <span style={{ color: "red" }}>{formik.errors.password}</span>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter gap="12px" flexDirection="column" margin="0 auto 12px">
            <Button
              background="green"
              _hover={{ backgroundColor: "green.500" }}
              colorScheme="blue"
              isLoading={isLoading}
              onClick={formik.handleSubmit}
              mr={3}
            >
              Sign In
            </Button>
            <Button  variant='link'  onClick={onClose}>
              <Link to="/forgotPassword">Forgot Password?</Link>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
