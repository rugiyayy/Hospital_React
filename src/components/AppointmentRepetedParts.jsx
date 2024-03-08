import {
  Container,
  Box,
  Flex,
  Text,
  Heading,
  FormControl,
  Input,
  Button,
  Select,
  HStack,
  Textarea,
  extendTheme,
  Toast,
  Spinner,
  VStack,
} from "@chakra-ui/react";
import { Section } from "@react-email/components";
import React, { useState, useRef } from "react";
import styles from "../assets/styles/appointment.module.scss";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../components/Constants";
import { httpClient } from "../utils/httpClient";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";
import { appointmentSchema } from "../validations/appointmentSchema";
import { Link } from "react-router-dom";

export default function AppointmentRepetedParts() {
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
  return (
    <Section zIndex="0">
      <Flex
        zIndex="-1"
        w="100%"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        className={styles.banner}
        margin="2rem 0"
        backgroundColor="#fff"
        bgRepeat="no-repeat"
        bgSize="cover"
        minHeight="330px"
        width="100%"
        maxW="100%"
        position="relative"
        // zIndex="100"
      >
        <Box
          zIndex="-1"
          // className={styles.overlay}
          width="100%"
          height="100%"
          position="absolute"
          opacity="0.9"
          bgColor="#223a66"
        />
        <Text color="white" as="b" fontWeight="700" fontSize="5xl">
          Appointment
        </Text>
      </Flex>
    </Section>
  );
}

function Spinner1() {
  return (
    <Flex
      flexDirection="column"
      gap="8px"
      justifyContent="center"
      alignItems="center"
      // border="2px solid red"
      margin="4rem 0"
      padding="4rem "
      // className={styles.spinner}
    >
      <Spinner size="xl" /> <h1>Loading</h1>
    </Flex>
  );
}

export { Spinner1 };
