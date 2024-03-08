import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
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
import { NavLink } from "react-router-dom";
import useSignUpModal from "../hooks/useSignUpModal";
import { useSelector } from "react-redux";

export default function SignUpModal(prop) {
  const { onOpen, isLoading, onClose, formik, isOpen } = useSignUpModal();
  // const { userName } = useSelector((x) => x.account);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <>
      {" "}
      <Button
        width={prop.width}
        fontSize="16px"
        fontWeight="600"
        textAlign="center"
        backgroundColor={prop.bg}
        color={prop.color}
        transition=".3s"
        _hover={{ bg: prop.hoverBg, color: prop.hoverColor }}
        onClick={onOpen}
      >
        {prop.name}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader textAlign="center">
            <Text as="p">Sign Up </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>FullName</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.fullName}
                onBlur={formik.handleBlur}
                name="fullName"
                type="text"
                placeholder="Full Name"
              />
              {formik.errors.fullName && formik.touched.fullName && (
                <span style={{ color: "red" }}>{formik.errors.fullName}</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Phone Number</FormLabel>{" "}
              <InputGroup>
                <InputLeftAddon>+994</InputLeftAddon>
                <Input
                  onChange={formik.handleChange}
                  value={formik.values.phoneNumber}
                  onBlur={formik.handleBlur}
                  name="phoneNumber"
                  type="tel"
                />
              </InputGroup>
              {formik.errors.phoneNumber && formik.touched.phoneNumber && (
                <span style={{ color: "red" }}>
                  {formik.errors.phoneNumber}
                </span>
              )}
            </FormControl>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.email}
                onBlur={formik.handleBlur}
                name="email"
                type="text"
                placeholder="Email"
              />
              {formik.errors.email && formik.touched.email && (
                <span style={{ color: "red" }}>{formik.errors.email}</span>
              )}
            </FormControl>
            <FormControl>
              <FormLabel>Identity Number (FIN)</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.patientIdentityNumber}
                onBlur={formik.handleBlur}
                name="patientIdentityNumber"
                type="text"
              />
              {formik.errors.patientIdentityNumber &&
                formik.touched.patientIdentityNumber && (
                  <span style={{ color: "red" }}>
                    {formik.errors.patientIdentityNumber}
                  </span>
                )}
            </FormControl>
            <FormControl>
              <FormLabel>Birth Date</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.birthDate}
                onBlur={formik.handleBlur}
                name="birthDate"
                type="date"
                placeholder="Birth Date"
              />
              {formik.errors.birthDate && formik.touched.birthDate && (
                <span style={{ color: "red" }}>{formik.errors.birthDate}</span>
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
              Sign Up
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
