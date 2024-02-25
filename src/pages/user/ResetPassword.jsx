import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Input,
  InputGroup,
  InputRightElement,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  extendTheme,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { httpClient } from "../../utils/httpClient";
import { useMutation, useQuery } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import resetPasswordSchema from "../../validations/resetPasswordSchema";
import { colors } from "../../components/Constants";

export default function ResetPassword() {
  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickPassword = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const handleClickConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("doctorId");
  const selectedDate = queryParams.get("selectedDate");
  const parsedDoctorId = parseInt(doctorId);
  const navigate = useNavigate();
  const toast = useToast();

  const [loggedIn, setLoggedIn] = useState(true);
  const { userName } = useSelector((state) => state.account);
  useEffect(() => {
    if (userName) {
      setLoggedIn(false);
    }
  }, [userName]);
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const resetPassword = useMutation(
    (formData) => httpClient.post("/Account/resetPassword", formData),
    {
      onSuccess: () => {
        toast({
          title: "Password reset",
          description: "Your password succesfully reset.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        navigate(`/`);
      },
      onError: (error) => {
        toast({
          title: "Error",
          description:
            error.response?.data ||
            error.message ||
            "Something went wrong. Please try again later.",
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      },
    }
  );

  const onSubmit = (values) => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        const formData = {
          Code: values.code,
          Password: values.password,
          confirmPassword: values.confirmPassword,
        };

        resetPassword.mutate(formData);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      code: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: onSubmit,
  });

  return (
    <Flex>
      <Container maxW="72%">
        <Box margin="5rem auto">
          <Text
            textAlign="center"
            fontWeight="700"
            fontSize="26px"
            color={colors.secondary}
            mb="2rem"
          >
            Check Your Email Please For Reset Code !
          </Text>
          <Text
            textAlign="center"
            fontWeight="600"
            fontSize="22px"
            color={colors.primary}
            m="1rem 0"
          >
            Reset Password
          </Text>
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
            <FormControl w="30%" mt={4}>
              <FormLabel fontWeight="400">Code</FormLabel>
              <Input
                onChange={formik.handleChange}
                value={formik.values.code}
                onBlur={formik.handleBlur}
                name="code"
                type="text"
              />
              {formik.errors.code && formik.touched.code && (
                <span style={{ color: "red" }}>{formik.errors.code}</span>
              )}
            </FormControl>
            <FormControl w="30%" mt={4}>
              <FormLabel fontWeight="400">Password</FormLabel>

              <InputGroup size="md">
                <Input
                  name="password"
                  onChange={formik.handleChange}
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  pr="4.5rem"
                  type={showPassword ? "text" : "password"}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClickPassword}>
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.errors.password && formik.touched.password && (
                <span style={{ color: "red" }}>{formik.errors.password}</span>
              )}
            </FormControl>

            <FormControl w="30%" mt={4}>
              <FormLabel fontWeight="400">Confirm Password</FormLabel>

              <InputGroup size="md">
                <Input
                  name="confirmPassword"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.confirmPassword}
                  pr="4.5rem"
                  type={showConfirmPassword ? "text" : "password"}
                />
                <InputRightElement width="4.5rem">
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={handleClickConfirmPassword}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {formik.errors.confirmPassword &&
                formik.touched.confirmPassword && (
                  <span style={{ color: "red" }}>
                    {formik.errors.confirmPassword}
                  </span>
                )}
            </FormControl>
            <Button
              m="2rem 0"
              background="green"
              _hover={{ backgroundColor: "green.500" }}
              colorScheme="blue"
              onClick={formik.handleSubmit}
              p="12px 28px"
            >
              Reset
            </Button>
          </Flex>
        </Box>
      </Container>
    </Flex>
  );
}
