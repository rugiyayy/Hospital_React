import styles from "../../assets/styles/home.module.scss"

import { Section } from "@react-email/components";
import React from "react";
import serviceImg1 from "../../assets/img/service/service-1.jpg"
import serviceImg2 from "../../assets/img/service/service-2.jpg";
import serviceImg3 from "../../assets/img/service/service-3.jpg";
import serviceImg4 from "../../assets/img/service/service-4.jpg";
import serviceImg5 from "../../assets/img/service/service-6.jpg";
import serviceImg6 from "../../assets/img/service/service-8.jpg";

import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Img,
  List,
  ListItem,
  Stack,
  Text,
  extendTheme,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faCalendarCheck,
  faClock,
  faCrutch,
  faDna,
  faHeadset,
  faHeartbeat,
  faTooth,
} from "@fortawesome/free-solid-svg-icons";
import { Helper } from "../../components/Helper";
import { colors } from "../../components/Constants";

const services = [
  {
    icon: faCalendarCheck,
    title: "Trauma services",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    icon: faHeartbeat,
    title: "Heart Disease",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    icon: faTooth,
    title: "Dental Care",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    icon: faCrutch,
    title: "Body Surgery",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    icon: faBrain,
    title: "Neurology Surgery",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    icon: faDna,
    title: "Gynecology",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
];

const whatWedo = [
  {
    imageUrl: serviceImg1,
    title: "Child Care",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    imageUrl: serviceImg2,
    title: "Personal Care",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    imageUrl: serviceImg3,
    title: "CT Scan",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    imageUrl: serviceImg4,
    title: "Joint Replacement",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    imageUrl: serviceImg5,
    title: "Examination & Diagnosis",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
  {
    imageUrl: serviceImg6,
    title: "Alzheimer's disease",
    description:
      "Saepe nulla praesentium eaque omnis perferendis a doloremque.",
  },
];

export default function Home() {
  const theme = extendTheme({
    textStyles: {
      span: {
        color: "#3f547b;",
        fontSize: "16",
        fontWeight: "400",
        textTransform: "uppercase",
        marginTop: "20px",
      },

      h1: {
        color: colors.secondary,
        fontSize: "60",
        fontWeight: "bold",
        lineHeight: "1.2",
      },
      h1_color: {
        fontSize: "60",
        fontWeight: "bold",
        lineHeight: "1.2",
      },

      p: {
        color: "#40709d;",
        fontSize: "16",
        fontWeight: "400",
      },

      //   a: {
      //     fontSize: "14px",
      //     fontWeight: "700",
      //     color: "white",
      //     bg: "#e12454",
      //     width: "40%",
      //     marginTop: "12px",
      //     borderRadius: "20px",
      //     padding: "24px",
      //     _hover: {
      //       bg: "#223a66",
      //     },
      //     transition: ".6s ease",
      //     textTransform: "uppercase",
      //     letterSpacing: "1px",
      //   },
      flex: {
        alignItems: "start",
        flexDirection: "column",
        gap: "24px",
      },
    },
  });
  return (
    <main>
      <Section as="banner" className={styles.banner}>
        <Container maxW="72%">
          <Flex
            _before={{
              content: `" "`,
              position: "absolute",
              width: "7%",
              borderTop: "4px solid #e12454",
            }}
            position="absolute"
            top="14rem"
            direction="column"
            gap="14px"
            width="40%"
          >
            <Text sx={theme.textStyles.span}>TOTAL HEALTH CARE solution</Text>
            <Text sx={theme.textStyles.h1}>
              Your Most Trusted Health Partner
            </Text>

            <Text sx={theme.textStyles.p}>
              A repudiandae ipsam labore ipsa voluptatum quidem quae laudantium
              quisquam aperiam maiores sunt fugit, deserunt rem suscipit
              placeat.
            </Text>
            <div>
              <Link to="/appointment">
                <Helper
                  text="Make appointment"
                  bgColor={colors.primary}
                  bgHover={colors.secondary}
                  fontSize="16px"
                />
              </Link>
            </div>
          </Flex>
        </Container>
      </Section>

      <Section className={styles.features} as="features">
        <Container maxW="72%">
          <Flex width="100%" justifyContent="space-between" alignItems="center">
            <Box className={styles.feature_item}>
              <Flex sx={theme.textStyles.flex}>
                <FontAwesomeIcon
                  className={styles.features_icon}
                  icon={faCalendarCheck}
                />
                <Stack lineHeight="1.1">
                  <Text color={colors.paragraph}>24 Hours Service</Text>
                  <Text color={colors.secondary} fontSize="22px" as="b">
                    Online Appoinment
                  </Text>
                </Stack>
                <Text lineHeight="1.2" color={colors.paragraph}>
                  Get ALl time support for emergency.We have introduced the
                  principle of family medicine.
                </Text>
                <Link to="/appointment">
                  <Helper
                    text="Make appointment"
                    bgColor={colors.secondary}
                    bgHover={colors.primary}
                    fontSize="12px"
                  />
                </Link>
              </Flex>
            </Box>

            <Box className={styles.feature_item}>
              <Flex sx={theme.textStyles.flex}>
                <FontAwesomeIcon
                  className={styles.features_icon}
                  icon={faClock}
                />
                <Stack lineHeight="1.1">
                  <Text color={colors.paragraph}>Timing schedule</Text>
                  <Text color={colors.secondary} fontSize="22px" as="b">
                    Working Hours
                  </Text>
                </Stack>
                <List width="100%" spacing="12px">
                  <ListItem className={styles.w_hours}>
                    <span> Sun - Wed :</span> <span>8:00 - 17:00</span>
                  </ListItem>
                  <ListItem className={styles.w_hours}>
                    <span> Thu - Fri :</span> <span>9:00 - 17:00</span>
                  </ListItem>
                  <ListItem className={styles.w_hours}>
                    <span> Sat - sun :</span> <span>10:00 - 17:00</span>
                  </ListItem>
                </List>
              </Flex>
            </Box>

            <Box className={styles.feature_item}>
              <Flex sx={theme.textStyles.flex}>
                <FontAwesomeIcon
                  className={styles.features_icon}
                  icon={faHeadset}
                />
                <Stack lineHeight="1.1">
                  <Text color={colors.paragraph}>Emegency Cases</Text>
                  <Text color={colors.secondary} fontSize="22px" as="b">
                    1-800-700-6200
                  </Text>
                </Stack>

                <Text lineHeight="1.2" color={colors.paragraph}>
                  Get ALl time support for emergency.We have introduced the
                  principle of family medicine.Get Conneted with us for any
                  urgency .
                </Text>
              </Flex>
            </Box>
          </Flex>
        </Container>
      </Section>

      <Section className={styles.about}>
        <Container maxW="72%">
          <Flex w="100%" alignItems="center" justifyContent="space-between">
            <Box className={styles.about_img} width="31%">
              <Img src={require("../../assets/img/about/img-1.jpg")} alt="" />
              <Img src={require("../../assets/img/about/img-2.jpg")} alt="" />
            </Box>

            <Box color="#e12454" width="31%">
              <Img
                w="100%"
                src={require("../../assets/img/about/img-3.jpg")}
                alt=""
              />
            </Box>

            <Box width="31%">
              <div className={styles.personal_care}>
                <Text
                  as="b"
                  color={colors.secondary}
                  fontSize="36px"
                  textTransform="capitalize"
                >
                  Personal care <br />& healthy living
                </Text>
                <Text paddingBottom="20px" color={colors.paragraph} as="p">
                  We provide best leading medicle service Nulla perferendis
                  veniam deleniti ipsum officia dolores repellat laudantium
                  obcaecati neque.
                </Text>
              </div>
            </Box>
          </Flex>
        </Container>
      </Section>

      <Section>
        <div className={styles.service}>
          <Container maxW="72%">
            <div>
              <Text
                mb="12px"
                padding="6rem 0  20px"
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
                Patient care
              </Text>
              <Text
                textAlign="center"
                color={colors.paragraph}
                margin="20px auto"
                w="60%"
              >
                Lets know moreel necessitatibus dolor asperiores illum possimus
                sint voluptates incidunt molestias nostrum laudantium. Maiores
                porro cumque quaerat.
              </Text>
            </div>

            <Flex
              margin="3rem 0"
              gap="20px"
              justifyContent="space-between"
              wrap="wrap"
            >
              {services.map((service, index) => (
                <div key={index} className={styles.service_item}>
                  <Flex className={styles.service_name}>
                    <FontAwesomeIcon
                      className={styles.service_icon}
                      icon={service.icon}
                    />
                    <Text fontSize="20px" color="black" fontWeight="bold">
                      {service.title}
                    </Text>
                  </Flex>

                  <Text className={styles.service_description}>
                    {service.description}
                  </Text>
                </div>
              ))}
            </Flex>
          </Container>
        </div>
      </Section>

      <Section className={styles.section_service}>
        <Container maxW="72%">
          <div>
            <Text
              mb="12px"
              padding="6rem 0  20px"
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
              Our services
            </Text>
            <Text
              textAlign="center"
              color={colors.paragraph}
              margin="20px auto"
              w="60%"
              fontSize="24px"
              fontWeight="500"
            >
              What We Do
            </Text>
          </div>

          <Flex
            margin="3rem 0"
            gap="20px"
            justifyContent="space-between"
            wrap="wrap"
          >
            {whatWedo.map((prop, i) => (
              <div className={styles.service_item} key={i}>
                <Box display="flex" flexDirection="column" gap="20px">
                  <Image width="100%" src={prop.imageUrl} />
                  <Box>
                    <Text
                      color={colors.secondary}
                      fontSize="24px"
                      fontWeight="bold"
                    >
                      {prop.title}
                    </Text>
                    <Text
                      color={colors.paragraph}
                      fontSize="16px"
                      fontWeight="400"
                    >
                      {prop.description}
                    </Text>
                  </Box>
                </Box>
              </div>
            ))}
          </Flex>
        </Container>
      </Section>

      <Section className={styles.banner_2}>
        <Container maxW="80%">
          <Box
            padding="5rem 0"
            display="flex"
            flexDirection="column"
            gap="20px"
          >
            <Box
              position="realiteve"
              _before={{
                content: `" "`,
                position: "absolute",
                width: "3%",
                borderTop: "4px solid #e12454",
              }}
              width="73%"
            >
              <Text paddingTop="16px" as="h1" sx={theme.textStyles.h1_color}>
                We are pleased to offer you
                <Text paddingLeft="16px" as="span" sx={theme.textStyles.h1}>
                  the chance to have the healthy
                </Text>
              </Text>
            </Box>

            <div>
              <Link to="/appointment">
                <Helper
                  text="Get appointment"
                  bgColor={colors.primary}
                  bgHover={colors.secondary}
                  fontSize="12px"
                />
              </Link>
            </div>
          </Box>
        </Container>
      </Section>
    </main>
  );
}
