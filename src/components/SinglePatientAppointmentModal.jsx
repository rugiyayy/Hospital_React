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

const SinglePatientAppointmentModal = ({ isOpen, onClose, appointment }) => {
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

  console.log(appointment);
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
                Doctor Name:{" "}
                <Text
                  padding="0 8px"
                  fontWeight="500"
                  as="span"
                  color={colors.primary}
                >
                  {appointment.doctorFullName}
                </Text>
              </Text>
              <Text fontWeight="600" fontSize="16px " color={colors.secondary}>
                Doctor Email:
                <Text
                  padding="0 8px"
                  fontWeight="500"
                  as="span"
                  color={colors.primary}
                >
                  {appointment.doctorEmail}
                </Text>
              </Text>
              <Text fontWeight="600" fontSize="16px " color={colors.secondary}>
                Department
                <Text
                  padding="0 8px"
                  fontWeight="500"
                  as="span"
                  color={colors.primary}
                >
                  {appointment.department}
                </Text>
              </Text>
              <Text fontWeight="600" fontSize="16px " color={colors.secondary}>
                Type
                <Text
                  padding="0 8px"
                  fontWeight="500"
                  as="span"
                  color={colors.primary}
                >
                  {appointment.type}
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
                Duration
                <Text
                  padding="0 8px"
                  fontWeight="500"
                  as="span"
                  color={colors.primary}
                >
                  30 m{" "}
                </Text>
              </Text>
              <Text fontWeight="600" fontSize="16px " color={colors.secondary}>
                Description:{" "}
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

export default SinglePatientAppointmentModal;
