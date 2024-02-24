import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import { Section } from "@react-email/components";
import React, { useEffect } from "react";
import styles from "../../assets/styles/singleDoctor.module.scss";
import { httpClient } from "../../utils/httpClient";
import { useQuery } from "react-query";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { colors } from "../../components/Constants";
import { color } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDots, faPhone } from "@fortawesome/free-solid-svg-icons";
import SignInModal from "../../components/SignInModal";
import { useSelector } from "react-redux";
import useSignInModal from "../../hooks/useSignInModal";
const theme = extendTheme({
  textStyles: {
    a: {
      fontSize: "14px",
      fontWeight: "700",
      color: "white",
      bg: "#e12454",
      marginTop: "12px",
      borderRadius: "20px",
      padding: "24px 16px",
      _hover: {
        bg: "#223a66",
      },
      transition: ".6s ease",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  },
});
const SingleDoctor = () => {
  const location = useLocation();
  const { userName, role } = useSelector((state) => state.account);


  const { isOpen, onClose } = useSignInModal();

  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const doctorId = queryParams.get("id");
  const parsedDoctorId = parseInt(doctorId);
  const getDoctor = () => {
    return httpClient.get(`/doctor/${parsedDoctorId}`);
  };
  console.log(parsedDoctorId);
  const {
    isLoading: doctorLoading,
    data: doctor,
    error: doctorError,
  } = useQuery(["doctor", parsedDoctorId], () => getDoctor(), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });

  return (
    <main>
      {" "}
      <Section>
        <Flex
          w="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          className={styles.banner}
        >
          <Box zIndex="10" className={styles.overlay} />
          <Text color="white" as="p" fontSize="1xl">
            Doctor Details
          </Text>
          <Text color={colors.primary} as="b" fontWeight="700" fontSize="5xl">
            {doctor?.data?.fullName}
          </Text>
        </Flex>
      </Section>
      <Container mt="1rem" mb="3rem" maxW="72%">
        <Section  class="section doctor-single">
          <Flex margin="1rem 0 5rem " alignItems="center" textAlign="center">
            <Box width="30%">
              {doctor?.data?.photoPath != null && (
                <Image
                  objectFit="cover"
                  width="100%"
                  height="400"
                  src={`https://localhost:7041/Images/${doctor?.data?.photoPath}`}
                  borderRadius="lg"
                />
              )}
              {doctor?.data?.photoPath == null && (
                <Image
                  objectFit="cover"
                  width="100%"
                  height="400"
                  src={
                    "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg"
                  }
                  borderRadius="lg"
                />
              )}
            </Box>
            <Flex
              flexDirection="column"
              gap="24px"
              padding="1rem 3rem  0"
              w="70%"
            >
              <Heading textAlign="start">Information about Doctor:</Heading>
              <List display="flex" flexDirection="column" gap="20px">
                <ListItem>
                  <Text
                    textAlign="start"
                    fontSize="24px"
                    color={colors.primary}
                    fontWeight="600"
                  >
                    {doctor?.data?.fullName}
                  </Text>
                </ListItem>
                <ListItem>
                  <Text
                    textAlign="start"
                    fontSize="16px"
                    color={colors.paragraph}
                    fontWeight="500"
                  >
                    Department:{" "}
                    <Text color={colors.secondary} as="span">
                      {doctor?.data?.departmentName}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text
                    textAlign="start"
                    fontSize="16px"
                    color={colors.paragraph}
                    fontWeight="500"
                  >
                    Doctor Type:{" "}
                    <Text color={colors.secondary} as="span">
                      {doctor?.data?.doctorTypeName}
                    </Text>
                  </Text>
                </ListItem>

                <ListItem>
                  <Text
                    textAlign="start"
                    fontSize="16px"
                    color={colors.paragraph}
                    fontWeight="500"
                  >
                    Examination Room:{" "}
                    <Text color={colors.secondary} as="span">
                      {doctor?.data?.examinationRoom?.roomNumber}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text
                    textAlign="start"
                    fontSize="16px"
                    color={colors.paragraph}
                    fontWeight="500"
                  >
                    Service Cost :{" "}
                    <Text color={colors.secondary} as="span">
                      {doctor?.data?.serviceCost} $
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  <Text
                    textAlign="start"
                    fontSize="16px"
                    color={colors.paragraph}
                    fontWeight="500"
                  >
                    <Text as="span">
                      <FontAwesomeIcon
                        color={colors.secondary}
                        icon={faCommentDots}
                      />{" "}
                    </Text>
                    Email Address:{" "}
                    <Text color={colors.secondary} as="span">
                      {doctor?.data?.doctorDetail?.email}
                    </Text>
                  </Text>
                </ListItem>
                <ListItem>
                  {" "}
                  <Text
                    textAlign="start"
                    fontSize="16px"
                    color={colors.paragraph}
                    fontWeight="500"
                  >
                    <Text as="span">
                      <FontAwesomeIcon
                        color={colors.secondary}
                        icon={faPhone}
                      />{" "}
                    </Text>
                    Phone Number:{" "}
                    <Text color={colors.secondary} as="span">
                      {doctor?.data?.doctorDetail?.phoneNumber}
                    </Text>
                  </Text>
                </ListItem>
              </List>

              <Box textAlign="start">
                {" "}
                {role !== "Doctor" && (
                  <>
                    {!userName ? (
                      <SignInModal
                        bg={"#e12454"}
                        isOpen={isOpen}
                        onClose={onClose}
                        name={"Make Appointment"}
                        color="white"
                        hoverBg="#223a66"
                        hoverColor="white"
                      />
                    ) : (
                      <Button
                        sx={theme.textStyles.a}
                        onClick={() =>
                          navigate(`/appointment?doctorId=${doctor.id}`)
                        }
                      >
                        Make Appointment
                      </Button>
                    )}
                  </>
                )}
              </Box>
            </Flex>
          </Flex>
        </Section>
      </Container>
    </main>
  );
};

export default SingleDoctor;
