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
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { httpClient } from "../../utils/httpClient";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { colors } from "../../components/Constants";
import { Spinner1 } from "../../components/AppointmentRepetedParts";
import { useLocation, useNavigate } from "react-router-dom";

export default function ListAppointmnets() {
  const [page, setPage] = useState(1);
  const [perPage] = useState(5);
  const location = useLocation();
  const navigate = useNavigate();
  const { token, patientId, userName, role } = useSelector(
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

  const getAppointments = (page, perPage) => {
    return httpClient.get(
      `/appointment/patients/${patientId}?_page=${page}&_perPage=${perPage}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };
  const {
    isLoading: appointmentLoading,
    data: appointment,
    error: appointmentError,
  } = useQuery(
    ["appointment", page, perPage],
    () => getAppointments(page, perPage),
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("_page", page.toString());
    urlParams.set("_perPage", perPage.toString());
    navigate(`?${urlParams.toString()}`);
  }, [page, perPage, location.search]);

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
  if (appointmentLoading) {
    return <Spinner1 />;
  }
  console.log(appointment?.data?.appointments);
  return (
    <Container maxW="72%">
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
          Appointments
        </Text>
        <Text
          textAlign="center"
          color={colors.paragraph}
          margin="20px auto "
          w="60%"
        >
          If you want to change the appointment time, please contact the clinic.
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
      {appointmentError &&
        !appointmentLoading &&
        !appointment?.data?.appointments?.length > 0 && (
          <Text
            color={colors.primary}
            fontWeight="700"
            fontSize="32px"
            textAlign="center"
            padding="3rem 0 "
            as="h2"
          >
            You don't have any appointments
          </Text>
        )}
      {appointment?.data?.appointments?.length > 0 && (
        <Table w="90%" variant="simple" margin="50px auto ">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Doctor</Th>
              <Th textAlign="center">Start Time</Th>
              <Th textAlign="center">Details</Th>
              <Th textAlign="end">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointment?.data?.appointments?.map((appointment, i) => (
              <Tr>
                <Td>{i + 1 + page * perPage - perPage}</Td>
                <Td>{appointment.doctorFullName}</Td>
                <Td textAlign="center">{appointment?.formattedStartTime}</Td>
                {/* <Td></Td> */}
                <Td textAlign="center" w="30%">
                  {appointment.description}
                </Td>
                <Td
                  textAlign="end"
                  fontWeight="700"
                  color={
                    appointment.isActive === true ? "green" : colors.primary
                  }
                >
                  {appointment.isActive === true
                    ? "Active"
                    : appointment.isActive === false
                    ? "Inactive"
                    : "Not specified"}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
      <ButtonGroup w="100%" margin="20px 0 40px" justifyContent="center">
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
          isDisabled={appointment?.data?.appointments?.length < perPage}
        >
          Next Page
        </Button>
      </ButtonGroup>
    </Container>
  );
}
