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
import { CalendarIcon, EmailIcon } from "@chakra-ui/icons";
import SingleDoctorAppointmentModal from "../../components/SingleDoctorAppointmentModal";
import Pagination2 from "../../components/Pagination2";

export default function DoctorListAppointments() {
  const [isActiveFilter, setIsActiveFilter] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const location = useLocation();
  const [selectedAppointment, setSelectedAppointment] = useState(null);
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
      keepPreviousData: true,
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
    setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
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

  if (!loggedIn) {
    return null;
  }

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
      ) : appointment?.apps?.length === 0 ? (
        <Text
          margin="4rem 0"
          padding="5rem"
          color={colors.primary}
          fontWeight="700"
          fontSize="32px"
          textAlign="center"
          as="h2"
        >
          No appointments
        </Text>
      ) : (
        <>
          <Box>
            <Flex justifyContent="center" alignItems="center">
              {" "}
              <Text
                color={colors.paragraph}
                fontSize="18px"
                fontWeight="600"
                textAlign="center"
              >
                Select Date{" "}
                <span
                  style={{
                    margin: "0 20px",
                    color: colors.secondary,
                    fontSize: "16px",
                    fontWeight: "500",
                  }}
                >
                  or
                </span>
              </Text>
              <Button
                onClick={handleReset}
                backgroundColor="white"
                color={colors.primary}
                _hover={{
                  backgroundColor: colors.paragraph,
                  color: "white",
                  border: "2px solid ",
                }}
                border="2px solid"
                borderColor={colors.primary}
                marginLeft="10px"
              >
                Reset Date
              </Button>
            </Flex>
            <InputGroup
              justifyContent="space-between"
              w="40%"
              margin="20px auto"
            >
              <Input
                w="40%"
                borderRadius="20px"
                type="date"
                onKeyDown={(e) => e.preventDefault()}
                placeholder="Start Date"
                value={startDate}
                onChange={handleStartDateChange}
              />
              <Input
                w="40%"
                borderRadius="20px"
                type="date"
                placeholder="End Date"
                onKeyDown={(e) => e.preventDefault()}
                value={endDate}
                min={startDate}
                onChange={handleEndDateChange}
              />
            </InputGroup>

            <Flex gap="4rem" justifyContent="center" alignItems="center">
              <Select
                w="17%"
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
                <option disabled value="all">
                  Select Status
                </option>
                <option value="all"> All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </Select>
              <Button
                w="13%"
                padding="22px"
                onClick={handleResetAll}
                backgroundColor="white"
                color={colors.primary}
                _hover={{
                  backgroundColor: colors.paragraph,
                  color: "white",
                  border: "2px solid ",
                }}
                border="2px solid"
                borderColor={colors.primary}
              >
                Reset All filters
              </Button>
            </Flex>
          </Box>

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
                        <Td w="30%">
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
                              <Text as="p">
                                {" "}
                                {appointment?.patientFullName}
                              </Text>
                              <EmailIcon color="blue.500" cursor="pointer" />
                            </Flex>
                          </Box>
                        </Td>

                        <Td w="30%" textAlign="center">
                          {appointment?.formattedStartTime}
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
                  color={colors.primary}
                  fontWeight="700"
                  fontSize="24px"
                  textAlign="center"
                  padding="3rem 0 "
                >
                  No{" "}
                  {isActiveFilter === null
                    ? " "
                    : isActiveFilter
                    ? "active"
                    : "inactive"}{" "}
                  appointments found.
                </Text>
              )}
            </Table>
          </Box>

          <Pagination2
            totalCount={appointment?.totalCount}
            perPage={perPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            page={page}
          />
        </>
      )}
    </Container>
  );
}
