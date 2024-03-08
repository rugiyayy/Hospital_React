import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Text,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useQuery } from "react-query";
import { httpClient } from "../utils/httpClient";
import { EmailIcon } from "@chakra-ui/icons";
import { colors } from "./Constants";

const SingleDoctorAppointmentModal = ({ isOpen, onClose, appointment }) => {
  const getApp = () => {
    return httpClient.get(`/appointment/${appointment?.id}`);
  };

  const {
    isLoading: appointmentLoading,
    data: appointmentDetails,
    error: appointmentError,
  } = useQuery(["appointmentDetails", appointment?.id], getApp, {
    refetchOnWindowFocus: false,
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent padding="20px 0">
        <ModalHeader>Appointment Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody padding="20px ">
          {appointmentLoading ? (
            <div>Loading...</div>
          ) : appointmentError ? (
            <div>Error: {appointmentError.message}</div>
          ) : (
            <Flex flexDirection="column" gap="20px " padding="0 20px">
              <Text fontWeight="600" fontSize="16px " color={colors.secondary}>
                Patient Full Name:{" "}
                <Text
                  padding="0 8px"
                  fontWeight="500"
                  as="span"
                  color={colors.primary}
                >
                  {appointment.patientFullName}
                </Text>
              </Text>
              <Text fontWeight="600" fontSize="16px " color={colors.secondary}>
                Patient Email:
                <Text
                  color={colors.primary}
                  padding="0 8px"
                  fontWeight="500"
                  width="100%"
                  margin="0 auto"
                  as="a"
                  href={`/sendEmail?to=${appointment?.patientEmail}`}
                >
                  <Text as="span"> {appointment?.patientEmail}</Text>
                  <EmailIcon ml="8px" color="blue.500" cursor="pointer" />
                </Text>
              </Text>
              <Text fontWeight="600" fontSize="16px " color={colors.secondary}>
                Start Time:{" "}
                <Text
                  padding="0 8px"
                  fontWeight="500"
                  as="span"
                  color={colors.primary}
                >
                  {appointment.formattedStartTime}
                </Text>
              </Text>
              <Text fontWeight="600" fontSize="16px " color={colors.secondary}>
                Appointment Description:
                <Text
                  padding="0 8px"
                  fontWeight="500"
                  as="span"
                  color={colors.primary}
                >
                  {appointment.description}
                </Text>
              </Text>
            </Flex>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default SingleDoctorAppointmentModal;
