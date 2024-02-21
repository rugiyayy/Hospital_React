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
import { useLocation, useNavigate } from "react-router-dom";
import { CalendarIcon } from "@chakra-ui/icons";

export default function DoctorListAppointments() {
  const [isActiveFilter, setIsActiveFilter] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
      toast({
        title: "Logged Out",
        description: "You have been logged out.",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top-right",
      });
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
      isActive: isActiveFilter,
      startDate: startDate,
      endDate: endDate,
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
  } = useQuery(
    ["appointment", isActiveFilter, page, perPage, startDate, endDate],
    getAppointments,
    {
      refetchOnWindowFocus: false,
    }
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("endDate", endDate);
    urlParams.set("startDate", startDate);
    urlParams.set("isActive", isActiveFilter);
    urlParams.set("page", page.toString());
    urlParams.set("perPage", perPage.toString());

    navigate(`?${urlParams.toString()}`);
  }, [isActiveFilter, page, perPage, endDate, startDate, navigate]);

  const handleStartDateChange = (e) => {
    e.preventDefault();
    const startDateValue = e.target.value;
    setStartDate(startDateValue);
    if (endDate && new Date(startDateValue) > new Date(endDate)) {
      setEndDate("");
    }
  };

  const handleEndDateChange = (e) => {
    e.preventDefault();
    setEndDate(e.target.value);
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleResetAll = () => {
    setIsActiveFilter(null);
    setStartDate("");
    setEndDate("");
    setPage(1);
    setPerPage(5);
  };
  const handleReset = () => {
    setStartDate("");
    setEndDate("");
    setPage(1);
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


  console.log(appointment?.totalCount===0);

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
      //!!!!!!!!!!!!!!!!!!!!!!!!!!
      <Box>
        <Button onClick={handleResetAll} colorScheme="red" marginLeft="10px">
          Reset All filters
        </Button>
      </Box>
      <Box width="20%" margin="0 60px ">
        <Select
          value={
            isActiveFilter === null
              ? "all"
              : isActiveFilter
              ? "active"
              : "inactive"
          }
          onChange={(e) => {
            setPage(1);
            const selectedValue = e.target.value;
            setIsActiveFilter(
              selectedValue === "all"
                ? null
                : selectedValue === "active"
                ? true
                : false
            );
          }}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </Select>
      </Box>
      <InputGroup w="50%" margin="3rem auto">
        <InputLeftElement pointerEvents="none">
          <CalendarIcon marginLeft={3} color="gray.600" />
        </InputLeftElement>
        <Input
          borderRadius="20px"
          type="date"
          onKeyDown={(e) => e.preventDefault()}
          placeholder="Start Date"
          value={startDate}
          onChange={handleStartDateChange}
        />
        <InputLeftElement pointerEvents="none">
          <CalendarIcon marginLeft={3} color="gray.600" />
        </InputLeftElement>
        <Input
          borderRadius="20px"
          type="date"
          placeholder="End Date"
          onKeyDown={(e) => e.preventDefault()}
          value={endDate}
          min={startDate}
          onChange={handleEndDateChange}
        />
      </InputGroup>
      <Button onClick={handleReset} colorScheme="blue" marginLeft="10px">
        Reset Date
      </Button>
      //!!!!!!!!!!!!!!!!!!!!!!!!!!!
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
        <Table w="90%" variant="simple" margin="50px auto ">
          <Thead>
            <Tr>
              <Th></Th>
              <Th>Patient Full Name</Th>
              <Th textAlign="center">Start Time</Th>
              <Th textAlign="center">Details</Th>
              <Th textAlign="end">Status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {appointment?.appointments?.map((appointment, i) => (
              <Tr key={appointment?.id}>
                <Td>{i + 1 + page * perPage - perPage}</Td>
                <Td>{appointment?.patient?.fullName}</Td>
                <Td textAlign="center">{appointment?.formattedStartTime}</Td>
                {/* <Td></Td> */}
                <Td textAlign="center" w="30%">
                  {appointment?.description}
                </Td>
                <Td
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
          isDisabled={appointment?.totalCount == perPage ||appointment?.totalCount<perPage*page}
        >
          Next Page
        </Button>
      </ButtonGroup>
    </Container>
  );
}
