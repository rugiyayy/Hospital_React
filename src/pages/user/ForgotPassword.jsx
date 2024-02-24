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

const ForgotPassword = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const getCode = useMutation(
    (formData) => httpClient.post("/forgotPassword", formData),
    {
      onSuccess: (data) => {
        const responseData = data.data;
        toast({
          title: "Check your email",
          description: responseData.message,
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        // formik.resetForm();

        setIsLoading(false);
      },
      onError: (error) => {
        console.log(error);
        const errorMessage =
          error.response?.data ||
          "Something went wrong. Please try again later.";
        toast({
          title: "Error",
          description: errorMessage,
          status: "error",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        setIsLoading(false);
      },
    }
  );
  const onSubmit = (values) => {
    const formData = {
      email: values.email,
    };
    setIsLoading(true);
    getCode.mutate(formData);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: forgotPasswordSchema,
    onSubmit: onSubmit,
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
        mt="2rem"
        padding="0 32px "
        isLoading={isLoading}
        onClick={formik.handleSubmit}
        mr={3}
        backgroundColor={colors.secondary}
        color="white"
        _hover={{ bg: "blue.600" }}
      >
        Send
      </Button>
    </Container>
  );
};

export default ForgotPassword;
