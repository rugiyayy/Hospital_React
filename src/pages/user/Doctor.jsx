import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Spinner,
  Stack,
  Text,
} from "@chakra-ui/react";

import React, { useEffect, useState } from "react";
import styles from "../../assets/styles/doctor.module.scss";
import { colors } from "../../components/Constants";
import { Section } from "@react-email/components";
import { useQuery } from "react-query";
import { httpClient } from "../../utils/httpClient";
import { Search2Icon } from "@chakra-ui/icons";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../../redux/slices/selectedFiltersSlice";
import Pagination from "../../components/Pagination";
import Errors from "../../components/DoctorPageErrorMessages.jsx";

//! start
export default function Doctor() {
  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const selectedFiltersRedux = useSelector((state) => state.selectedFilters);




  const [page, setPage] = useState(1);
  const [perPage] = useState(9);

  //#region //!GET Doctor, DocType, Department
  const getDoctors = () => {
    return httpClient.get(`/doctor`);
  };
  const getTypes = () => {
    return httpClient.get("/doctortype");
  };
  const getDepartments = () => {
    return httpClient.get("/department");
  };
  //#endregion

  //#region //! URLSearchParams get Filters
  const [selectedFilters, setSelectedFilters] = useState(() => {
    const urlParams = new URLSearchParams(location.search);
    const selectedDoctorTypes = urlParams
      .getAll("doctorType")
      .map((type) => type.toLowerCase());
    const selectedDepartments = urlParams
      .getAll("department")
      .map((dep) => dep.toLowerCase());

    return {
      selectedDoctorTypes,
      selectedDepartments,
    };
  });

  //#endregion

  //#region //! URLSearchParams delete/append filters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    urlParams.delete("doctorType");
    urlParams.delete("department");

    selectedFilters.selectedDoctorTypes.forEach((type) =>
      urlParams.append("doctorType", type)
    );
    selectedFilters.selectedDepartments.forEach((department) =>
      urlParams.append("department", department)
    );
    urlParams.set("_page", page.toString());
    navigate(`?${urlParams.toString()}`);
  }, [selectedFilters, location.search, navigate, page]);
  //#endregion

  //#region //!UseQuery Doctor, DocType, Department
  const {
    isLoading: doctorLoading,
    data: doctor,
    error: doctorError,
  } = useQuery(
    ["doctor"],
    () => getDoctors(),
    {
      refetchOnWindowFocus: false,
      keepPreviousData: true,
    }
  );
  const {
    isLoading: doctorTypeLoading,
    data: doctorType,
    error: doctorTypeError,
  } = useQuery("docType", getTypes, {
    refetchOnWindowFocus: false,
  });

  const {
    isLoading: departmentLoading,
    data: department,
    error: departmentError,
  } = useQuery("department", getDepartments, {
    refetchOnWindowFocus: false,
  });
  //#endregion

  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedFilters]);

  //#region //!Spinner
  if (doctorLoading || doctorTypeLoading || departmentLoading) {
    return (
      <Box
        position="absolute"
        top="280px"
        left="740px"
        className={styles.spinner}
      >
        <Spinner size="xl" /> <h1>Loading ...</h1>
      </Box>
    );
  }
  //#endregion

  //#region  //! Filtered Data
  const filteredData = doctor?.data?.filter((doctor) => {
    const nameMatches = doctor?.fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const typeMatches =
      selectedFilters.selectedDoctorTypes.length === 0 ||
      selectedFilters.selectedDoctorTypes.includes(
        doctor?.doctorTypeName?.toLowerCase()
      );

    const departmentMatches =
      selectedFilters.selectedDepartments.length === 0 ||
      selectedFilters.selectedDepartments.includes(
        doctor?.departmentName?.toLowerCase()
      );

    return nameMatches && typeMatches && departmentMatches;
  });

  //#endregion

  //#region //! for Paging (disabled)
  const totalPages = filteredData
    ? Math.ceil(filteredData.length / perPage)
    : 0;
  const startIndex = filteredData ? (page - 1) * perPage : 0;

  const endIndex =
    page === totalPages
      ? filteredData
        ? filteredData.length
        : 0
      : startIndex + perPage;
  //#endregion

  //#region //! HandleCheckboxChange
  const handleCheckboxChange = ({ target: { checked } }, value, filterType) => {
    dispatch(toggleFilter({ id: value, type: filterType }));
    setSelectedFilters((prev) => {
      const updatedSelection = checked
        ? { ...prev, [filterType]: [...prev[filterType], value] }
        : {
            ...prev,
            [filterType]: prev[filterType].filter((item) => item !== value),
          };
      return updatedSelection;
    });
  };
  //#endregion

  return (
    <main>
      {/* //! Section 1 */}
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

      {/* //! Section 2  */}
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
                content: '""',
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
          {doctor?.data?.length > 0 && (

            // {/* //! Seacrh Input */}

            <InputGroup w="50%" margin="0 auto">
              <InputLeftElement pointerEvents="none">
                <Search2Icon marginLeft={3} color="gray.600" />
              </InputLeftElement>
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                borderRadius="20px"
                type="text"
                placeholder="Search by Doctor's Full Name"
              />
            </InputGroup>
          )}
          <Box
            w="100%"
            color={colors.primary}
            fontWeight="700"
            fontSize="28px"
            textAlign="center"
            margin="0 auto"
          >
            {doctor == null && doctorError != null && (
              <Text as="h1">Failed to get doctors</Text>
            )}
          </Box>
          {/* //!   MAIN PART */}
          <Box>
            <Grid
              margin="3rem -1rem"
              templateRows="repeat(1, 1fr)"
              templateColumns="repeat(4, 1fr)"
              gap={4}
            >
              {/* //! DocType Dep */}
              <GridItem padding="0 20px" rowSpan={5} colSpan={1}>
                {" "}
                <Text
                  fontSize="lg"
                  fontWeight="600"
                  color={colors.primary}
                  textAlign="center"
                  margin="20px 0"
                >
                  Doctor Types
                </Text>
                {doctorType?.data?.map((type) => (
                  <Stack spacing={5} direction="column">
                    <FormControl
                      isDisabled={
                        doctorLoading || doctorError || doctor?.length === 0
                      }
                      key={type.id}
                    >
                      <Checkbox
                        fontSize="50px"
                        padding="2px 0"
                        _checked={{ color: colors.primary }}
                        value={type.name.toLowerCase()}
                        checked={selectedFiltersRedux.selectedDoctorTypes.includes(
                          type.name.toLowerCase()
                        )}
                        onChange={(e) =>
                          handleCheckboxChange(
                            e,
                            type.name.toLowerCase(),
                            "selectedDoctorTypes"
                          )
                        }
                      >
                        <Text
                          textAlign="center"
                          fontWeight="400"
                          fontSize="17px"
                        >
                          {type.name}
                        </Text>
                      </Checkbox>
                    </FormControl>
                  </Stack>
                ))}
                <Box
                  w="100%"
                  color={colors.primary}
                  fontWeight="700"
                  fontSize="16px"
                  textAlign="center"
                  margin="0 auto"
                >
                  {doctorType == null && doctorTypeError != null && (
                    <Text as="h1">Failed to get doctor Types</Text>
                  )}
                </Box>
                <Divider w="80%" margin="40px auto 30px" />
                <Text
                  fontSize="lg"
                  fontWeight="600"
                  color={colors.primary}
                  textAlign="center"
                  margin="10px 0 18px"
                >
                  Departments
                </Text>
                <Box>
                  {department?.data?.map((dep) => (
                    <Stack spacing={5} direction="column">
                      <FormControl
                        isDisabled={
                          doctorLoading || doctorError || doctor?.length === 0
                        }
                        key={dep.id}
                      >
                        <Checkbox
                          w="100%"
                          padding="2px 0"
                          _checked={{ color: colors.primary }}
                          margin="0 auto"
                          fontSize="50px"
                          value={dep.name.toLowerCase()}
                          checked={selectedFiltersRedux.selectedDepartments.includes(
                            dep.name.toLowerCase()
                          )}
                          onChange={(e) =>
                            handleCheckboxChange(
                              e,
                              dep.name.toLowerCase(),
                              "selectedDepartments"
                            )
                          }
                        >
                          <Text fontWeight="400" fontSize="17px">
                            {dep.name}
                          </Text>
                        </Checkbox>
                      </FormControl>
                    </Stack>
                  ))}
                </Box>
                <Box
                  w="100%"
                  color={colors.primary}
                  fontWeight="700"
                  fontSize="16px"
                  textAlign="center"
                  margin="0 auto"
                >
                  {department == null && departmentError != null && (
                    <Text as="h1">Failed to get Departments</Text>
                  )}
                </Box>
              </GridItem>
              {filteredData &&
                filteredData?.slice(startIndex, endIndex).map((doctor, i) => (
                //   {/*//! Doctor Card */}
                  <GridItem colSpan={1}>
                    {" "}
                    <Card height="56vh" key={doctor.id}>
                      <CardHeader>
                        <NavLink color={colors.paragraph} to="/">
                          {doctor.docPhoto?.photoPath != null && (
                            <Image
                              padding="20px"
                              objectFit="cover"
                              // width="400vw"
                              // height="300"
                              width="100%"
                              height="220"
                              src={`https://localhost:7041/Images/${doctor.docPhoto?.photoPath}`}
                              borderRadius="lg"
                            />
                          )}
                          {doctor.docPhoto?.photoPath == null && (
                            <Image
                              objectFit="cover"
                              width="100%"
                              height="220"
                              src={
                                "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg"
                              }
                              borderRadius="lg"
                            />
                          )}
                        </NavLink>
                      </CardHeader>
                      <CardBody padding="0px 25px">
                        <Text
                          textAlign="center"
                          fontWeight="500"
                          fontSize="18px"
                          color={colors.secondary}
                        >
                          {" "}
                          {doctor.fullName}
                        </Text>
                      </CardBody>
                      <CardFooter padding="12px 24px">
                        <Button
                          transition=".6s"
                          _hover={{
                            background: colors.paragraph,
                            color: "white",
                          }}
                        >
                          <Link to="/">make an appointment </Link>
                        </Button>
                      </CardFooter>
                    </Card>
                  </GridItem>
                ))}
              {filteredData && filteredData.length > 0 && (
    //    {/*         // !Pagination  */}
                <Pagination
                  filteredData={filteredData}
                  perPage={perPage}
                  page={page}
                  setPage={setPage}
                />
              )}
                 {/*          //! Error Messages */}
              <Errors
                doctorType={doctorType}
                doctorTypeError={doctorTypeError}
                doctorTypeLoading={doctorTypeLoading}
                department={department}
                departmentError={departmentError}
                departmentLoading={departmentLoading}
                doctor={doctor}
                doctorError={doctorError}
                doctorLoading={doctorLoading}
                filteredData={filteredData}
                selectedFilters={selectedFilters}
                searchTerm={searchTerm}
              />
            </Grid>
          </Box>
        </Container>
      </Section>
    </main>
  );
}
