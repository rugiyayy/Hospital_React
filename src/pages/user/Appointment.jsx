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
} from "@chakra-ui/react";
import { Section } from "@react-email/components";
import React from "react";
import styles from "../../assets/styles/appointment.module.scss";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../components/Constants";

function Appointment() {
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
    <main>
      <Section>
        <Flex
          w="100%"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          className={styles.banner}
          margin="22px 0"
          backgroundColor="#fff"
          bgRepeat="no-repeat"
          bgSize="cover"
          minHeight="330px"
          width="100%"
          maxW="100%"
          position="relative"
          zIndex="100"
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

      <Section>
        <Container maxW="72%">
          <Flex padding="4rem 0">
            <Flex flexDirection="column" gap="20px" alignItems="start" w="40%">
              <FontAwesomeIcon
                fontSize="44px"
                color={colors.paragraph}
                icon={faHeadset}
              />
              <Text
                as="h1"
                color={colors.primary}
                fontWeight="700"
                fontSize="26px"
              >
                Call for an Emergency Service!
              </Text>
              <Text color={colors.secondary} fontSize="38px" fontWeight="bold">
                +84 789 1256
              </Text>
            </Flex>

            <Flex flexDirection="column" gap="20px" alignItems="start" w="60%">
              <Text
                width="100%"
                color={colors.secondary}
                fontSize="38px"
                fontWeight="bold"
              >
                Book an appoinment
              </Text>
              <Text color={colors.paragraph}>
                Mollitia dicta commodi est recusandae iste, natus eum asperiores
                corrupti qui velit . Iste dolorum atque similique praesentium
                soluta.
              </Text>

              <FormControl gap="20px">
                <HStack margin="20px 0" spacing={8}>
                  <Select
                    fontSize="17px"
                    size="md"
                    w="60%"
                    placeholder="Select Doctor"
                  >
                    <option value="option1">Option 1</option>
                    <option value="option2">Option 2</option>
                    <option value="option3">Option 3</option>
                  </Select>
                <Input w="40%" size="md" type="date"/>
                </HStack>

                <Textarea marginBottom="14px" placeholder="Symptoms..." />

                <Button sx={theme.textStyles.a}>Make an appointment</Button>
              </FormControl>
            </Flex>
          </Flex>
        </Container>
      </Section>
    </main>
  );
}

export default Appointment;
