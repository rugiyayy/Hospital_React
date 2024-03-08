import {
  Box,
  Container,
  Divider,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  ButtonGroup,
  Button,
  useToast,
  InputGroup,
  InputLeftElement,
  Input,
  Select,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { httpClient } from "../../utils/httpClient";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { colors } from "../../components/Constants";
import { Spinner1 } from "../../components/AppointmentRepetedParts";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon, EmailIcon } from "@chakra-ui/icons";
import SingleDoctorAppointmentModal from "../../components/SingleDoctorAppointmentModal";
import Pagination2 from "../../components/Pagination2";

export default function DoctorTodaysAppList() {
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, doctorId, userName, role } = useSelector(
    (state) => state.account
  );

  const [loggedIn, setLoggedIn] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (!userName) {
      setLoggedIn(false);
    }
  }, [userName, toast]);
  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
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

  const getAppointments = async () => {
    const params = {
      page,
      perPage,
    };
    const response = await httpClient.get(
      `/appointment/todaysApp/${doctorId}`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  };
  const {
    isLoading: appointmentLoading,
    data: appointment,
    error: appointmentError,
  } = useQuery(["appointment", page, perPage], getAppointments, {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", page.toString());
    urlParams.set("perPage", perPage.toString());

    navigate(`?${urlParams.toString()}`);
  }, [page, perPage, navigate]);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  if (!loggedIn) {
    return null;
  }
  //   if (appointmentLoading) {
  //     return <Spinner1 />;
  //   }

  // if (
  //   !appointment ||
  //   !appointment.todaysAppointments ||
  //   appointment.todaysAppointments.length === 0
  // ) {
  //   return (
  //     <Text
  //       margin="4rem 0"
  //       padding="5rem"
  //       color={colors.primary}
  //       fontWeight="700"
  //       fontSize="32px"
  //       textAlign="center"
  //       as="h2"
  //     >
  //       There are no appointments for today.
  //     </Text>
  //   );
  // }
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  console.log(appointment?.appointments);

  return (
    <Container mt="1rem" mb="6rem" maxW="72%">
      <Box>
        <Text
          mb="40px"
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
            width: "4%",
            borderTop: "4px solid #e12454",
          }}
        >
          Todays Appointments
        </Text>
        <Text
          textAlign="center"
          fontSize="20px"
          color={colors.primary}
          fontWeight="600"
        >
          {currentDate}
        </Text>
      </Box>
      {appointmentError ? (
        <Text
          margin="4rem 0"
          padding="5rem"
          color={colors.primary}
          fontWeight="700"
          fontSize="32px"
          textAlign="center"
          as="h2"
        >
          Something went wrong, please try again later
        </Text>
      ) : appointmentLoading ? (
        <Spinner1 />
      ) : (
        <Box>
          <Box height="60vh" margin="3rem 0">
            <Table w="100%" variant="simple" margin="50px auto ">
              {appointment?.appointments?.length > 0 ? (
                <>
                  <Thead>
                    <Tr>
                      <Th></Th>
                      <Th textAlign="center">Patient Full Name</Th>
                      <Th textAlign="center">Start Time</Th>
                      <Th textAlign="center">Status</Th>
                      <Th textAlign="end">For more details</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {appointment?.appointments?.map((appointment, i) => (
                      <Tr key={appointment?.id}>
                        <Td w="5%">{i + 1 + page * perPage - perPage}</Td>
                        <Td w="30%" textAlign="center">
                          <Box
                            textAlign="center"
                            width="100%"
                            margin="0 auto"
                            as="a"
                            href={`/sendEmail?to=${appointment?.patientEmail}`}
                          >
                            <Flex
                              flexDirection="column"
                              alignItems="center"
                              gap="12px"
                            >
                              <Text as="p">{appointment?.patientFullName}</Text>
                              <EmailIcon color="blue.500" cursor="pointer" />
                            </Flex>
                          </Box>
                        </Td>

                        <Td w="30%" textAlign="center">
                          {appointment?.formattedStartTime.split(" ")[1]}
                        </Td>

                        <Td
                          w="15%"
                          textAlign="center"
                          fontWeight="700"
                          color={
                            appointment?.isActive === true
                              ? "green"
                              : colors.primary
                          }
                        >
                          {appointment?.isActive === true
                            ? "Active"
                            : appointment?.isActive === false
                            ? "Inactive"
                            : "Not specified"}
                        </Td>
                        <Td
                          textAlign="end"
                          w="20%"
                          onClick={() => setSelectedAppointment(appointment)}
                        >
                          <Button>Get more</Button>
                        </Td>
                      </Tr>
                    ))}
                    <SingleDoctorAppointmentModal
                      isOpen={!!selectedAppointment}
                      onClose={() => setSelectedAppointment(null)}
                      appointment={selectedAppointment}
                    />
                  </Tbody>
                </>
              ) : (
                <Text
                  mb="4rem"
                  padding="5rem"
                  color={colors.primary}
                  fontWeight="700"
                  fontSize="32px"
                  textAlign="center"
                  as="h2"
                >
                  No appointments for today.
                </Text>
              )}
            </Table>
          </Box>
          {appointment?.appointments?.length > 0 && (
            <Pagination2
              totalCount={appointment?.totalCount}
              perPage={perPage}
              handleNextPage={handleNextPage}
              handlePreviousPage={handlePreviousPage}
              page={page}
            />
          )}
        </Box>
      )}
    </Container>
  );
}
