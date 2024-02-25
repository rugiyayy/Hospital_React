import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { httpClient } from "../utils/httpClient";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import sendEmailSchema from "../validations/sendEmailSchema";
import { colors } from "../components/Constants";

function SendEmail() {
  const { userName, token, doctorId, role } = useSelector(
    (state) => state.account
  );
  const toast = useToast();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const defaultTo = queryParams.get("to") || "";

  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(true);
  const parsedDoctorId = parseInt(doctorId);

  useEffect(() => {
    if (!userName) {
      setLoggedIn(false);
    }
  }, [userName, toast]);
  useEffect(() => {
    if (!loggedIn) {
      navigate("/appointment");
    }
  }, [loggedIn, navigate]);
  useEffect(() => {
    if (role !== "Doctor") {
      navigate("/");
      toast({
        title: "Access Denied",
        description: "You don't have permission to view this page.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  }, [role, navigate, toast]);

  const sendEmail = useMutation(
    (formData) =>
      httpClient.post("/Email", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      onSuccess: () => {
        toast({
          title: "Email",
          description: "Your email has been successfully sent.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        navigate(`/sentEmailsList`); //perenaprav na stranichu email list (komu on visilal email)
      },
      onError: (error) => {
        console.error("Error:", error);
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
    const formData = {
      From: userName, //doctor's email
      To: defaultTo || values.to,
      Subject: values.subject,
      Body: values.body,
    };

    sendEmail.mutate(formData);

    console.log("formdata: ", formData);
  };

  const formik = useFormik({
    initialValues: {
      from: userName,
      to: defaultTo,
      subject: "",
      body: "",
    },
    validationSchema: sendEmailSchema,
    onSubmit: onSubmit,
  });

  if (!loggedIn) {
    return null;
  }

  return (
    <Container w="72%">
      <Text textAlign="center">Send Online Reciept</Text>
      <Box
        backgroundImage="url('/assets/img/bg/emailsenderbg.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        m="3rem 0"
        boxShadow="lg"
        p="6"
        rounded="md"
        bg="white"
      >
        <FormControl mt={4}>
          {" "}
          <FormLabel>To</FormLabel>
          <InputGroup size="md">
            <Input
              name="to"
              onChange={formik.handleChange}
              value={formik.values.to}
              onBlur={formik.handleBlur}
              pr="4.5rem"
              type="text"
              placeholder="Patient's gmail address"
            />
            <InputRightElement width="4.5rem"></InputRightElement>
          </InputGroup>
          {formik.errors.to && formik.touched.to && (
            <span style={{ color: "red" }}>{formik.errors.to}</span>
          )}
        </FormControl>
        <FormControl mt={4}>
          {" "}
          <FormLabel>Subject</FormLabel>
          <InputGroup size="md">
            <Input
              name="subject"
              onChange={formik.handleChange}
              value={formik.values.subject}
              onBlur={formik.handleBlur}
              pr="4.5rem"
              type="text"
            />
            <InputRightElement width="4.5rem"></InputRightElement>
          </InputGroup>
          {formik.errors.subject && formik.touched.subject && (
            <span style={{ color: "red" }}>{formik.errors.subject}</span>
          )}
        </FormControl>

        <FormControl mt={4}>
          {" "}
          <FormLabel>Message</FormLabel>
          <InputGroup size="md">
            <Textarea
              value={formik.values.body}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              name="body"
              maxLength={250}
            />
          </InputGroup>
          {formik.errors.body && formik.touched.body && (
            <span style={{ color: "red" }}>{formik.errors.body}</span>
          )}
        </FormControl>
        <Button mt="1rem" onClick={formik.handleSubmit}>
          Send Email
        </Button>
      </Box>
    </Container>
  );
}

export default SendEmail;
