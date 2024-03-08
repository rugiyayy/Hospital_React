import React, { useEffect, useState } from "react";
import AppointmentRepetedParts from "../../components/AppointmentRepetedParts";
import { httpClient } from "../../utils/httpClient";
import { useMutation, useQuery } from "react-query";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  FormControl,
  FormLabel,
  GridItem,
  Select,
  SimpleGrid,
  Text,
  Textarea,
  VStack,
  extendTheme,
  useToast,
} from "@chakra-ui/react";
import { colors } from "../../components/Constants";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { appDetailsSchema } from "../../validations/appDetailsSchema";
import { useLocation, useNavigate } from "react-router-dom";

export default function AppointmentDetails() {
  const theme = extendTheme({
    textStyles: {
      a: {
        fontSize: "14px",
        fontWeight: "700",
        color: "white",
        bg: colors.secondary,
        marginTop: "12px",
        borderRadius: "20px",
        padding: "24px 16px",
        _hover: {
          bg: colors.primary,
        },
        transition: ".2s ease",
        textTransform: "uppercase",
        letterSpacing: "1px",
      },
    },
  });
  const [loggedIn, setLoggedIn] = useState(true);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("doctorId");
  const parsedDoctorId = parseInt(doctorId);

  const selectedDate = queryParams.get("selectedDate");
  const { userName, token, patientId, role } = useSelector(
    (state) => state.account
  );
  const parsedPatientId = parseInt(patientId);
  const toast = useToast();
  const navigate = useNavigate();

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
    if (role === "Doctor") {
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

  const getDoctorName = async () => {
    const response = await httpClient.get(`/doctor/${parsedDoctorId}`);
    return response.data.fullName;
  };
  const {
    isLoading: isDoctorLoading,
    data: doctorData,
    error: doctorError,
  } = useQuery(["doctor", parsedDoctorId], getDoctorName, {
    refetchOnWindowFocus: false,
    refetchInterval: false,
  });

  const getTimeSlot = () => {
    return httpClient.get("/Appointment/AvailableTimeSlots", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        selectedDate: selectedDate,
        doctorId: parsedDoctorId,
      },
    });
  };
  const {
    isLoading: timeSlotLoading,
    data: timeSlot,
    error: timeSlotError,
  } = useQuery(
    ["availableTimeSlots", parsedDoctorId, selectedDate],
    getTimeSlot,
    {
      refetchOnWindowFocus: false,
      refetchInterval: false,
    }
  );

  const createAppointment = useMutation(
    (formData) =>
      httpClient.post("/appointment", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }),
    {
      onSuccess: () => {
        toast({
          title: "Appointment Created",
          description: "Your appointment has been successfully scheduled.",
          status: "success",
          duration: 4000,
          isClosable: true,
          position: "top-right",
        });
        navigate(`/appointment`);
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
      },
    }
  );

  const onSubmit = (values) => {
    const formData = {
      StartTime: values.startTime,
      DoctorId: parsedDoctorId,
      PatientId: parsedPatientId,
      Description: values.description,
    };

    createAppointment.mutate(formData);
  };

  const formik = useFormik({
    initialValues: {
      startTime: selectedDate,
      patientId: parsedPatientId,
      doctorId: parsedDoctorId,
      description: "",
    },
    validationSchema: appDetailsSchema,
    onSubmit: onSubmit,
  });
  const [selectedTime, setSelectedTime] = useState(null);

  const handleSelectTime = (time) => {
    setSelectedTime(selectedTime === time ? null : time);
    const startTime =
      selectedTime === time ? selectedDate : `${selectedDate} ${time}`;
    formik.setFieldValue("startTime", startTime);
  };

  if (!loggedIn) {
    return null;
  }

  ////!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!1

  return (
    <main>
      <AppointmentRepetedParts />
      <Container mt="1rem" maxW="72%">
        <Box mb="7rem">
          <Flex w="100%" justifyContent="space-between" alignItems="center">
            <Flex width="45%" flexWrap="wrap" gap="8px">
              <VStack mb="8px">
                {isDoctorLoading && <p>Loading doctor information...</p>}
                {doctorError && (
                  <p>
                    Error fetching doctor information: {doctorError.message}
                  </p>
                )}
                {doctorData && (
                  <Text
                    fontSize="18px"
                    fontWeight="600"
                    color={colors.secondary}
                  >
                    Doctor:
                    <Text padding="0 20px" color={colors.primary} as="span">
                      {doctorData}
                    </Text>
                  </Text>
                )}
                {timeSlotLoading && <p>Loading...</p>}
                {timeSlotError && <p>Error: {timeSlotError.message}</p>}
                {timeSlot && (
                  <Text
                    fontSize="18px"
                    fontWeight="600"
                    color={colors.secondary}
                  >
                    Available time slots for
                    <Text padding="0 20px" color={colors.primary} as="span">
                      {selectedDate} :
                    </Text>
                  </Text>
                )}
              </VStack>
              <SimpleGrid templateColumns="repeat(4, 4fr)" gap="20px">
                {timeSlot?.data?.map((time, i) => (
                  <GridItem w="105px">
                    <Button
                      w="100%"
                      key={i}
                      style={{
                        backgroundColor:
                          selectedTime === time
                            ? colors.primary
                            : colors.secondary,
                      }}
                      gap="10px"
                      name="startTime"
                      justifyContent="center"
                      alignItems="center"
                      sx={theme.textStyles.a}
                      onClick={() => handleSelectTime(time)}
                    >
                      <Text> {time}</Text>
                    </Button>
                  </GridItem>
                ))}
              </SimpleGrid>
              {timeSlotLoading && <p>Loading...</p>} {/* potom napishu */}
              {timeSlotError && <p>Error: {timeSlotError.message}</p>}
            </Flex>
            <Flex width="45%" flexDirection="column" gap="40px">


              <FormControl gap="20px">

                <FormLabel>Appointment description(details) :</FormLabel>
                <Textarea
                  placeholder="Checkup..."
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="description"
                  maxLength={29}
                />
                {formik.touched.description && formik.errors.description && (
                  <Text color="red">{formik.errors.description}</Text>
                )}
                <ButtonGroup margin="20px 0 0">
                  {" "}
                  <Button onClick={() => navigate(`/appointment`)}>
                    Go Back to Previous Page
                  </Button>
                  <Button
                    isDisabled={
                      selectedTime === null || formik.errors.description
                    }
                    onClick={formik.handleSubmit}
                  >
                    Make Appointment
                  </Button>
                </ButtonGroup>
              </FormControl>
            </Flex>
          </Flex>
        </Box>
      </Container>
    </main>
  );
}
