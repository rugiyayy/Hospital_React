import {
  Container,
  Flex,
  Text,
  FormControl,
  Input,
  Button,
  Select,
  extendTheme,
  useToast,
} from "@chakra-ui/react";
import { Section } from "@react-email/components";
import React, { useState, useRef, useEffect } from "react";
import { faAngleRight, faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../components/Constants";
import { httpClient } from "../../utils/httpClient";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { appointmentSchema } from "../../validations/appointmentSchema";
import {useLocation, useNavigate } from "react-router-dom";
import AppointmentRepetedParts, {
  Spinner1,
} from "../../components/AppointmentRepetedParts";
import useSignInModal from "../../hooks/useSignInModal";
import SignInModal from "../../components/SignInModal";

function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();
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
        transition: ".6s ease",
        textTransform: "uppercase",
        letterSpacing: "1px",
      },
    },
  });

  const selectRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const { token, userName } = useSelector((state) => state.account);
  const toast = useToast();
  const formik = useFormik({
    initialValues: {
      selectedDate: "",
      fullName: "",
      doctorId: null,
    },
    validationSchema: appointmentSchema,
    onSubmit: async (values) => {
      try {
        setIsLoading(true);
        const response = await httpClient.get(
          "/Appointment/AvailableTimeSlots",
          {
            params: {
              selectedDate: values.selectedDate,
              doctorId: values.doctorId,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Available time slots:", response.data);
        navigate(
          `/appointment-details?doctorId=${values.doctorId}&selectedDate=${values.selectedDate}`
        );
      } catch (error) {
        console.error("Error fetching available time slots:", error);
        toast({
          title: "Error",
          description: error.response.data|| "Uppss something went wrong .. check your connection or logout and sign in again",
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

  // useEffect(() => {
  //   const urlParams = new URLSearchParams(location.search);
  //   urlParams.set("doctorId", formik.values.doctorId);
  //   urlParams.set("selectedDate", formik.values.selectedDate);

  //   navigate(`?${urlParams.toString()}`);
  // }, [formik.values.doctorId, formik.values.selectedDate]);


  const { isOpen, onClose } = useSignInModal();
   const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const next30Days = new Date();
  next30Days.setDate(next30Days.getDate() + 30);

  const getDoctors = (token) => {
    return httpClient.get("/doctor", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const {
    isLoading: doctorLoading,
    data: doctor,
    error: doctorError,
  } = useQuery(["doctor"], () => getDoctors(), {
    refetchOnWindowFocus: false,
  });

 

  if (doctorLoading) {
    return <Spinner1 />;
  }

  return (
    <main>
      <AppointmentRepetedParts />

      <Section>
        <Container maxW="72%">
          <Flex padding="4rem 0">
            <Flex flexDirection="column" gap="20px" alignItems="start" w="40%">
              <FontAwesomeIcon
                fontSize="44px"
                color={colors.paragraph}
                icon={faHeadset}
              />
              <Text
                as="h1"
                color={colors.primary}
                fontWeight="700"
                fontSize="26px"
              >
                Call for an Emergency Service!
              </Text>
              <Text color={colors.secondary} fontSize="38px" fontWeight="bold">
                +84 789 1256
              </Text>
            </Flex>

            <Flex flexDirection="column" gap="20px" alignItems="start" w="60%">
              <Text
                width="100%"
                color={colors.secondary}
                fontSize="38px"
                fontWeight="bold"
              >
                Book an appoinment
              </Text>
              <Text color={colors.paragraph}>
                Mollitia dicta commodi est recusandae iste, natus eum asperiores
                corrupti qui velit . Iste dolorum atque similique praesentium
                soluta.
              </Text>

              <FormControl gap="20px">
                <Flex justifyContent="space-between">
                  {formik.errors.doctorId && formik.touched.doctorId && (
                    <Text color="red" width="58%">
                      {formik.errors.doctorId}
                    </Text>
                  )}
                  {formik.errors.selectedDate &&
                    formik.touched.selectedDate && (
                      <Text color="red" width="38%">
                        {formik.errors.selectedDate}
                      </Text>
                    )}
                </Flex>
                <Flex
                  alignItems="center"
                  margin="20px 0"
                  justifyContent="space-between"
                >
                  <Select
                    width="58%"
                    ref={selectRef}
                    name="doctorId"
                    value={formik.values.doctorId}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  >
                    <option selected disabled value="default">
                      Select Doctor
                    </option>
                    {doctor?.data?.map((x, i) => {
                      return (
                        <option key={i} value={x.id}>
                          {x.fullName}
                        </option>
                      );
                    })}
                  </Select>

                  <Input
                    w="38%"
                    size="md"
                    type="date"
                    name="selectedDate"
                    value={formik.values.selectedDate}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    min={tomorrow.toISOString().split("T")[0]}
                    max={next30Days.toISOString().split("T")[0]}
                  />
                </Flex>

                {!userName ? (
                  <SignInModal
                    bg={"#e12454"}
                    isOpen={isOpen}
                    onClose={onClose}
                    name={"Make Appointment"}
                    color="white"
                    hoverBg="#223a66"
                    hoverColor="white"
                  />
                ) : (
                  <Button
                    gap="10px"
                    justifyContent="center"
                    alignItems="center"
                    onClick={formik.handleSubmit}
                    isLoading={isLoading}
                    sx={theme.textStyles.a}
                  >
                    <Text> Click to see Aviable times</Text>
                    <FontAwesomeIcon fontSize="28px" icon={faAngleRight} />
                  </Button>
                )}
              </FormControl>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </main>
  );
}

export default Appointment;
