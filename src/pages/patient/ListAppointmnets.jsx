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
  Select,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import { httpClient } from "../../utils/httpClient";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";
import { colors } from "../../components/Constants";
import { Spinner1 } from "../../components/AppointmentRepetedParts";
import { useLocation, useNavigate } from "react-router-dom";
import Pagination2 from "../../components/Pagination2";
import SinglePatientAppointmentModal from "../../components/SinglePatientAppointmentModal";

export default function ListAppointmnets() {
  const [isActiveFilter, setIsActiveFilter] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

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

  const getAppointments = async () => {
    const params = {
      page,
      perPage,
      isActive: isActiveFilter,
    };

    const response = await httpClient.get(
      `/appointment/patients/${patientId}`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response;
  };
  const {
    isLoading: appointmentLoading,
    data: appointment,
    error: appointmentError,
  } = useQuery(
    ["appointment", page, perPage, isActiveFilter],
    getAppointments,
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("page", page.toString());
    urlParams.set("perPage", perPage.toString());
    urlParams.set("isActive", isActiveFilter);

    navigate(`?${urlParams.toString()}`);
  }, [page, perPage, isActiveFilter, location.search]);

  const handlePreviousPage = () => {
    setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  if (!loggedIn) {
    return null;
  }
  // console.log("page*perPage:", page * perPage);

  // console.log(
  //   "appointment?.totalAppointments == perPage",
  //   appointment?.data?.appointments.length === perPage
  // );

  // console.log(
  //   "appointment?.data?.totalAppointments < page * perPage",
  //   appointment?.data?.totalAppointments < page * perPage
  // );
  // console.log("totalApps:", appointment?.data?.totalAppointments);
  const appNull = appointment?.data?.totalCount === 0;

  console.log(appointment?.data?.totalCount);
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
      {appointmentError ? (
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
      ) : appointmentLoading ? (
        <Spinner1 />
      ) : appNull && isActiveFilter === null ? (
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
      ) : (
        <>
          <Box>
            <Text
              padding="0 4px"
              w="13%"
              color={colors.paragraph}
              fontSize="18px"
              fontWeight="600"
              margin="12px 0"
            >
              Select Status :
            </Text>
            <Select
              w="13%"
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

          <Box height="60vh" margin="3rem 0">
            {appointment?.data?.appointments?.length > 0 ? (
              <Table w="90%" variant="simple" margin="50px auto ">
                <Thead>
                  <Tr>
                    <Th></Th>
                    <Th>Doctor</Th>
                    <Th textAlign="center">Start Time</Th>
                    <Th textAlign="center">Status</Th>
                    <Th textAlign="end">For more details</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {appointment?.data?.appointments?.map((appointment, i) => (
                    <Tr>
                      <Td>{i + 1 + page * perPage - perPage}</Td>
                      <Td>{appointment.doctorFullName}</Td>
                      <Td textAlign="center">
                        {appointment?.formattedStartTime}
                      </Td>
                      {/* <Td></Td> */}

                      <Td
                        textAlign="center"
                        fontWeight="700"
                        color={
                          appointment.isActive === true
                            ? "green"
                            : colors.primary
                        }
                      >
                        {appointment.isActive === true
                          ? "Active"
                          : appointment.isActive === false
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
                  <SinglePatientAppointmentModal
                    isOpen={!!selectedAppointment}
                    onClose={() => setSelectedAppointment(null)}
                    appointment={selectedAppointment}
                  />
                </Tbody>
              </Table>
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
                  ? "appointments"
                  : isActiveFilter
                  ? "active"
                  : "inactive"}{" "}
                appointments found.
              </Text>
            )}
          </Box>
          <Pagination2
            totalCount={appointment?.data?.totalCount}
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
