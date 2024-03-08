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
import { httpClient } from "../../utils/httpClient";
import { useMutation } from "react-query";
import { useFormik } from "formik";
import sendEmailSchema from "../../validations/sendEmailSchema";
import { colors } from "../../components/Constants";
import styles from "../../assets/styles/email.module.scss";
function SendEmail() {
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(false);
        navigate(`/sentEmailsList`);
      },
      onError: (error) => {
        if (error?.response?.status === 401) {
          toast({
            title: "Authorization Error",
            description: "Please Log out and Log in again",
            status: "error",
            duration: 3000,
            isClosable: true,
            position: "top-right",
          });
        } else {
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
        }
        setIsLoading(false);
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

    setIsLoading(true);
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
    <Box h="105vh" mb="5rem" className={styles.email}>
      <Container w="72%">
        <Text
          padding="4rem 0  20px"
          textAlign="center"
          color={colors.secondary}
          fontSize="38px"
          fontWeight="bold"
          position="relative"
          _after={{
            right: "47.4%",
            content: `" "`,
            top: "100%",
            position: "absolute",
            width: "12%",
            borderTop: "4px solid #e12454",
          }}
        >
          Send Online Receipt
        </Text>
        <Box
          backgroundPosition="center"
          backgroundRepeat="no-repeat"
          m="2rem 0"
          boxShadow="rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"
          p="6"
          rounded="md"
          bg="white"
        >
          <FormControl mt={4}>
            {" "}
            <FormLabel>To</FormLabel>
            <InputGroup size="md">
              <Input
                isDisabled={isLoading}
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
                isDisabled={isLoading}
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
                isDisabled={isLoading}
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
          <Button isLoading={isLoading} mt="1rem" onClick={formik.handleSubmit}>
            Send Email
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default SendEmail;
