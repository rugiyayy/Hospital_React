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

export default function DoctorTodaysAppList() {
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
    const response = await httpClient.get(`/appointment/doctors/${doctorId}`, {
      params,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };
  const {
    isLoading: appointmentLoading,
    data: appointment,
    error: appointmentError,
  } = useQuery(["appointment", page, perPage], getAppointments, {
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", page.toString());
    urlParams.set("perPage", perPage.toString());

    navigate(`?${urlParams.toString()}`);
  }, [page, perPage, navigate]);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const totalAppointments = appointment?.data?.totalCount ?? 0;
  const totalPages = Math.ceil(totalAppointments / perPage);
  const handleNextPage = () => {
    if (page > totalPages) {
      setPage(page + 1);
    }
  };

  if (!loggedIn) {
    return null;
  }
  //   if (appointmentLoading) {
  //     return <Spinner1 />;
  //   }

  console.log(appointment?.totalCount === 0);
  console.log(appointment?.todaysAppointments);

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
      </Box>
      {appointmentError && (
        <Text
          color={colors.primary}
          fontWeight="700"
          fontSize="32px"
          textAlign="center"
          padding="3rem 0 "
          as="h2"
        >
          Something went wrong , please try again later
        </Text>
      )}
      {appointment?.appointments?.length > 0 && (
        <Table w="100%" variant="simple" margin="50px auto ">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Patient Full Name</Th>
              <Th textAlign="center">Patient Email</Th>
              <Th textAlign="center">Start Time</Th>
              <Th textAlign="center">Details</Th>
              <Th textAlign="end">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointment?.todaysAppointments?.map((appointment, i) => (
              <Tr key={appointment?.id}>
                <Td w="5%">{i + 1 + page * perPage - perPage}</Td>
                <Td w="20%">{appointment?.patientFullName}</Td>
                <Td w="20%">
                  <Box
                    textAlign="center"
                    width="100%"
                    margin="0 auto"
                    as="a"
                    href={`/sendEmail?to=${appointment?.patientEmail}`}
                  >
                    <Flex flexDirection="column" alignItems="center" gap="12px">
                      <Text as="p"> {appointment?.patientEmail}</Text>
                      <EmailIcon color="blue.500" cursor="pointer" />
                    </Flex>
                  </Box>
                </Td>

                <Td w="20%" textAlign="center">
                  {appointment?.startTime}
                </Td>

                <Td w="30%" textAlign="center">
                  {appointment?.description}
                </Td>
                <Td
                  w="5%"
                  textAlign="end"
                  fontWeight="700"
                  color={
                    appointment?.isActive === true ? "green" : colors.primary
                  }
                >
                  {appointment?.isActive === true
                    ? "Active"
                    : appointment?.isActive === false
                    ? "Inactive"
                    : "Not specified"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <ButtonGroup w="100%" margin="2rem 0 5rem" justifyContent="center">
        <Button
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
          onClick={handlePreviousPage}
          isDisabled={page === 1}
        >
          Previous Page
        </Button>
        <Button
          _active={{
            bg: "#dddfe2",
            transform: "scale(0.98)",
            borderColor: "#bec3c9",
          }}
          _focus={{
            boxShadow:
              "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
          }}
          onClick={handleNextPage}
          isDisabled={
            appointment?.totalCount == perPage ||
            appointment?.totalCount < perPage * page
          }
        >
          Next Page
        </Button>
      </ButtonGroup>
    </Container>
  );
}
