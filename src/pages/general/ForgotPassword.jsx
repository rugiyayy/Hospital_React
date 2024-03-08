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
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
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

  const forgotPassword = useMutation(
    (formData) => httpClient.post("/Account/forgotPassword", formData),
    {
      onSuccess: () => {
        toast({
          title: "Check your email",
          description: "Reset code sent to your email.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        setFormSubmitted(true);
        setIsLoading(false);
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
          Email: values.email,
          FrontendPort: window.location.origin,
        };
        setIsLoading(true);
        forgotPassword.mutate(formData);
      }
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      frontendPort: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: onSubmit,
  });


  return (
    <Container mt="5rem" w="72%">
      {formSubmitted ? (
        <Text
          fontWeight="600"
          fontSize="22px"
          color={colors.primary}
          m="2rem 0"
        >
          Please check your email for the reset link.
        </Text>
      ) : (
        <>
          <Text
            fontWeight="600"
            fontSize="22px"
            color={colors.primary}
            m="2rem 0"
          >
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
        </>
      )}
    </Container>
  );
};

export default ForgotPassword;
