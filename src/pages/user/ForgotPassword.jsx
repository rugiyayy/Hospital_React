import {
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import forgotPasswordSchema from "../../validations/forgotPasswordSchema";
import { httpClient } from "../../utils/httpClient";
import { colors } from "../../components/Constants";
import { useMutation } from "react-query";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const { userName } = useSelector((state) => state.account);

  const [loggedIn, setLoggedIn] = useState(true);

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
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await httpClient.get("/Account/forgotPassword", {
          params: {
            email: values.email,
          },
        });

        navigate(`/resetPassword`);

        toast({
          title: "Check your email",
          description: "Reset code sent to your email.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } catch (error) {
        const errorMessage =
          error.response?.data ||
          "Something went wrong. Please try again later.";
        toast({
          title: "Error",
          description: errorMessage || error.message || error || error.response,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Container mt="5rem" w="72%">
      <Text fontWeight="600" fontSize="22px" color={colors.primary} m="2rem 0">
        To reset password please enter your email:{" "}
      </Text>

      <FormControl w="50%">
        <Input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          name="email"
          type="text"
        />
        {formik.errors.email && formik.touched.email && (
          <span style={{ color: "red" }}>{formik.errors.email}</span>
        )}
      </FormControl>
      <Button
        mt="1rem"
        padding="0 32px "
        isLoading={isLoading}
        onClick={formik.handleSubmit}
        mr={3}
        backgroundColor={colors.secondary}
        color="white"
        _hover={{ bg: "blue.600" }}
      >
        Next
      </Button>
    </Container>
  );
};

export default ForgotPassword;
