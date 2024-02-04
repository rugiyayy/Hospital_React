import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  List,
  ListItem,
  SimpleGrid,
  Spinner,
  Stack,
  StylesProvider,
  Text,
} from "@chakra-ui/react";

import React, { useState } from "react";
import styles from "../../assets/styles/doctor.module.scss";
import { colors } from "../../components/Constants";
import { Section } from "@react-email/components";
import { useQuery } from "react-query";
import { httpClient } from "../../utils/httpClient";
import { Search2Icon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { Helper } from "../../components/Helper";

export default function Doctor() {
  const { isLoading, data, error } = useQuery("doctor", () => {
    return httpClient.get("/doctor");
  });

  const [searchTerm, setSearchTerm] = useState("");

  if (isLoading) {
    return (
      <div className={styles.spinner}>
        <Spinner size="xl" /> <h1>Loading</h1>
      </div>
    );
  }

  const filteredData = data?.data.filter(
    (doctor) =>
      doctor.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.doctorTypeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.departmentName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main>
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
            All Doctors
          </Text>
          <Text color="white" as="b" fontWeight="700" fontSize="5xl">
            Specalized doctors
          </Text>
        </Flex>
      </Section>

      <Section className={styles.dep_list}>
        <Container maxW="72%">
          <Box>
            <Text
              width="100%"
              mb="12px"
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
              Doctors
            </Text>
            <Text
              textAlign="center"
              color={colors.paragraph}
              margin="20px auto "
              w="60%"
            >
              We provide a wide range of creative services adipisicing elit.
              Autem maxime rem modi eaque, voluptate. Beatae officiis neque
            </Text>
          </Box>
          {data?.data.length > 0 && (
            <InputGroup w="50%" margin="0 auto">
              <InputLeftElement pointerEvents="none">
                <Search2Icon marginLeft={3} color="gray.600" />
              </InputLeftElement>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                borderRadius="20px"
                type="text"
                placeholder="Search by Full Name, Department, Doctor Type "
              />
            </InputGroup>
          )}
          <Box
            color={colors.primary}
            fontWeight="700"
            fontSize="28px"
            textAlign="center"
            margin="0 auto"
          >
            {data == null && error != null && (
              <Text as="h1">Failed to get doctors</Text>
            )}

            {data?.data.length == 0 && <Text as="h1">No items ...</Text>}
            {data == null && error == null && isLoading}

            {filteredData?.length === 0 && data?.data.length != 0 && (
              <Text as="h1">There are no items like "{searchTerm}"</Text>
            )}
          </Box>
          {/* <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
            margin="3rem 0"
            w="100%"
            gap="20px"
            alignItems="center"
           
          >
            {filteredData?.map((doctor, i) => (
              <Card key={doctor.id} maxW="sm">
                <Box>
                  <Link color={colors.paragraph} to="/">
                    {doctor.docPhoto?.photoPath != null && (
                      <Image
                        padding="20px"
                        objectFit="cover"
                        width="400vw"
                        height="300"
                        src={`https://localhost:7041/Images/${doctor.docPhoto?.photoPath}`}
                        borderRadius="lg"
                      />
                    )}

                    {doctor.docPhoto?.photoPath == null && (
                      <Image
                        objectFit="cover"
                        width="400"
                        height="300"
                        src={
                          "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg"
                        }
                        borderRadius="lg"
                      />
                    )}
                  </Link>
                  <Stack mt="6" spacing="3">
                    <Heading w="100%" textAlign="center" size="md">
                      {doctor.fullName}
                    </Heading>
                    <Button
                      margin="0 auto"
                      //   w="70%"
                      variant="solid"
                      color={colors.primary}
                    >
                      Make an Appointment
                    </Button>
                  </Stack>
                </Box>
              </Card>

              //   <Box width="100%"  key={doctor.id}>
              //     <Image
              //       src={`https://localhost:7041/Images/${doctor.docPhoto?.photoPath}`}
              //     />

              //     <Text
              //       fontSize="20px"
              //       color={colors.secondary}
              //       fontWeight="bold"
              //     >
              //       {doctor.fullName}
              //     </Text>
              //     <Text fontSize="12px" color={colors.paragraph} fontWeight="500">
              //       {doctor.doctorTypeName}
              //     </Text>

              //     <Text
              //       _hover={{
              //         color: colors.primary,
              //       }}
              //       fontSize="14px"
              //       fontWeight="600"
              //       color={colors.secondary}
              //     >
              //       <Link to="/">Read More</Link>
              //     </Text>
              //   </Box>
            ))}
          </SimpleGrid> */}

          <SimpleGrid
            spacing={4}
            templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
          >
            {filteredData?.map((doctor, i) => (
              <Card key={doctor.id}>
                <CardHeader>
                  <Link color={colors.paragraph} to="/">
                    {doctor.docPhoto?.photoPath != null && (
                      <Image
                        padding="20px"
                        objectFit="cover"
                        width="400vw"
                        height="300"
                        src={`https://localhost:7041/Images/${doctor.docPhoto?.photoPath}`}
                        borderRadius="lg"
                      />
                    )}
                    {doctor.docPhoto?.photoPath == null && (
                      <Image
                        objectFit="cover"
                        width="400"
                        height="300"
                        src={
                          "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg"
                        }
                        borderRadius="lg"
                      />
                    )}
                  </Link>
                </CardHeader>
                <CardBody>
                  <Text> {doctor.fullName}</Text>
                </CardBody>
                <CardFooter>
                  <Button>View here</Button>
                </CardFooter>
              </Card>
            ))}
          </SimpleGrid>
        </Container>
      </Section>
    </main>
  );
}
