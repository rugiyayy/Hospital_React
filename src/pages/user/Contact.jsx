import {
  Box,
  Container,
  Divider,
  Flex,
  GridItem,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { httpClient } from "../../utils/httpClient";
import { useQuery } from "react-query";
import { useSelector } from "react-redux";

export default function Contact() {
  const { token, patientId } = useSelector((state) => state.account);

  const getAppointments = (id) => {
    return httpClient.get(`/appointment/patients/${patientId}/appointments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };
  const {
    isLoading: appointmentLoading,
    data: appointment,
    error: appointmentError,
  } = useQuery(["appointment"], () => getAppointments(), {
    refetchOnWindowFocus: false,
  });

  return (
    <Container maxW="72%">
      <Flex>
        <Text>Yor Appointments</Text>
        <Flex flexDirection="column">
          {appointment?.data?.map((appointment, i) => (
            <>
             <h2>Appointment Details</h2>
      <p>Doctor: {appointment.doctor.fullName}</p>
      <p>Start Time: {appointment.startTime}</p>
      <p>End Time: {appointment.endTime}</p>
<Divider width="20ox"/>
            </>
          ))}
        </Flex>
      </Flex>
    </Container>
  );
}
