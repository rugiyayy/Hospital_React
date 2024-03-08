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
  const token = (queryParams.get("token"));

  const email = queryParams.get("email");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();

  const [loggedIn, setLoggedIn] = useState(true);
  const { userName } = useSelector((state) => state.account);

  useEffect(() => {
    if (!token) {
      navigate('/forgotPassword');
    }
  }, [token, navigate]);


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
    (formData) => httpClient.post("/Account/ResetPassword", formData),
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
        setIsLoading(true);

        navigate(`/`);
      },
      onError: (error) => {
        if (
          error.response &&
          error.response?.data &&
          error.response?.data?.errors
        ) {
          const validationErrors = error.response.data.errors;
          const errorMessage = Object.values(validationErrors).join("\v\r\n");

          formik.setErrors(
            error?.response?.data?.errors ||
              error?.response?.data ||
              "Something went wrong. Please try again later."
          );

          console.log("api validation error:", error?.response?.data?.errors);
          toast({
            title: "Error",
            description:
              errorMessage || "Something went wrong. Please try again later.",
            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        } else if (error?.response?.status === 401) {
          console.log("error401:", error);

          toast({
            title: "Authorization Error",
            description: "You are not authorized",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
          console.log(" if eldsfse error message :", error.response);
        } else {
          console.log(" if else error message :", error.response);

          toast({
            title: "Error",
            description:
              error?.response?.data ||
              error?.response ||
              "An unexpected error occurred. Please try again later.",

            status: "error",
            duration: 4000,
            isClosable: true,
            position: "top-right",
          });
        }
        setIsLoading(false);
      },
    }
  );

  const onSubmit = (values) => {
    formik.validateForm().then((errors) => {
      if (Object.keys(errors).length === 0) {
        const formData = {
          Email: email,
          Token: token,
          Password: values.password,
          ConfirmPassword: values.confirmPassword,
        };
        setIsLoading(true);

        resetPassword.mutate(formData);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: resetPasswordSchema,
    onSubmit: onSubmit,
  });

  console.log(token);
  return (
    <Flex>
      <Container maxW="72%">
        <Box margin="5rem auto">
          <Text
            textAlign="center"
            fontWeight="600"
            fontSize="22px"
            color={colors.primary}
            m="3rem 0"
          >
            Reset Password
          </Text>
          <Flex
            justifyContent="center"
            flexDirection="column"
            alignItems="center"
          >
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
