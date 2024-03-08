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
  VStack,
  extendTheme,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import styles from "../../assets/styles/doctor.module.scss";
import { colors } from "../../components/Constants.jsx";
import { Section } from "@react-email/components";
import { useQuery } from "react-query";
import { httpClient } from "../../utils/httpClient.js";
import { Search2Icon } from "@chakra-ui/icons";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFilter } from "../../redux/slices/selectedFiltersSlice.js";
import Pagination from "../../components/Pagination.jsx";
import Errors from "../../components/DoctorPageErrorMessages.jsx.jsx";
import Banner2 from "../doctor/DoctorBanner2.jsx";
import useSignInModal from "../../hooks/useSignInModal.js";
import SignInModal from "../../components/SignInModal.jsx";
import { Spinner1 } from "../../components/AppointmentRepetedParts.jsx";

const theme = extendTheme({
  textStyles: {
    a: {
      fontSize: "12px",
      fontWeight: "600",
      color: "white",
      bg: "#e12454",
      borderRadius: "20px",
      padding: "20px 14px",
      _hover: {
        bg: "#223a66",
      },
      transition: ".6s ease",
      textTransform: "uppercase",
      letterSpacing: "1px",
    },
  },
});

//! start
export default function Doctor() {
  const { userName, role } = useSelector((state) => state.account);

  const { isOpen, onClose } = useSignInModal();

  const location = useLocation();
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");

  const dispatch = useDispatch();
  const selectedFiltersRedux = useSelector((state) => state.selectedFilters);

  const [page, setPage] = useState(1);
  const [perPage] = useState(6);

  //#region //!GET Doctor, DocType, Department
  const getDoctors = () => {
    return httpClient.get(`/doctor`);
  };
  const getTypes = () => {
    return httpClient.get("/doctorType");
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

    selectedFiltersRedux.selectedDoctorTypes.forEach((type) =>
      urlParams.append("doctorType", type)
    );
    selectedFiltersRedux.selectedDepartments.forEach((department) =>
      urlParams.append("department", department)
    );
    urlParams.set("_page", page.toString());
    navigate(`?${urlParams.toString()}`);
  }, [selectedFiltersRedux, location.search, navigate, page]);
  //#endregion

  //#region //!UseQuery Doctor, DocType, Department
  const {
    isLoading: doctorLoading,
    data: doctor,
    error: doctorError,
  } = useQuery(["doctor"], () => getDoctors(), {
    refetchOnWindowFocus: false,
    keepPreviousData: true,
  });
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

  //#region  //! Filtered Data
  const filteredData = doctor?.data?.doctors?.filter((doctor) => {
    const nameMatches = doctor?.fullName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());

    const typeMatches =
      selectedFiltersRedux.selectedDoctorTypes.length === 0 ||
      selectedFiltersRedux.selectedDoctorTypes.includes(
        doctor?.doctorTypeName?.toLowerCase()
      );

    const departmentMatches =
      selectedFiltersRedux.selectedDepartments.length === 0 ||
      selectedFiltersRedux.selectedDepartments.includes(
        doctor?.departmentName?.toLowerCase()
      );

    return nameMatches && typeMatches && departmentMatches;
  });
  // console.log(filteredData);
  // console.log(doctor?.data?.doctors);

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

  console.log(doctor?.data?.doctors);

  return (
    <main>
      {/* //! Section 1 */}
      <Section
        zIndex="0"
        //  mt="20rem"
      >
        <Flex
          zIndex="-1"
          mt="2rem"
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
          {doctorLoading ? (
            <Spinner1 />
          ) : (
            <Box>
              {" "}
              {doctor?.data?.totalCount > 0 && (
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
              {/* //!   MAIN PART */}
              <Box>
                <Box h="900px">
                  {" "}
                  <Grid
                    margin="3rem -1rem 0rem"
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
                      {doctorType?.data?.types?.map((type) => (
                        <Stack spacing={5} direction="column">
                          <FormControl
                            isDisabled={
                              doctorLoading ||
                              doctorError ||
                              doctor?.data?.totalCount === 0
                            }
                            key={type.id}
                          >
                            <Checkbox
                              fontSize="50px"
                              padding="2px 0"
                              _checked={{ color: colors.primary }}
                              isChecked={selectedFiltersRedux.selectedDoctorTypes.includes(
                                type.name.toLowerCase()
                              )}
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
                        {department?.data?.departments?.map((dep) => (
                          <Stack spacing={5} direction="column">
                            <FormControl
                              isDisabled={
                                doctorLoading ||
                                doctorError ||
                                doctor?.data?.totalCount === 0
                              }
                              key={dep.id}
                            >
                              <Checkbox
                                w="100%"
                                padding="2px 0"
                                isChecked={selectedFiltersRedux.selectedDepartments.includes(
                                  dep.name.toLowerCase()
                                )}
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
                      filteredData
                        ?.slice(startIndex, endIndex)
                        .map((doctor, i) => (
                          //   {/*//! Doctor Card */}
                          <GridItem colSpan={1}>
                            {" "}
                            <Card margin="12px 0" height="49vh" key={doctor.id}>
                              <CardHeader
                              p="16px"
                                margin="0 auto"
                                onClick={() =>
                                  navigate(`/singleDoctor?id=${doctor.id}`)
                                }
                              >
                                {doctor?.photoPath != null && (
                                  <Image
                                    margin="0 auto"
                                    cursor="pointer"
                                    // padding="12px"
                                    objectFit="cover"
                                    // width="400vw"
                                    // height="300"
                                    width="90%"
                                    height="170"
                                    src={`https://localhost:7041/Images/${doctor?.photoPath}`}
                                    borderRadius="lg"
                                  />
                                )}
                                {doctor?.photoPath == null && (
                                  <Image
                                    objectFit="cover"
                                    width="90%"
                                    height="170"
                                    src={
                                      "https://t4.ftcdn.net/jpg/01/86/29/31/360_F_186293166_P4yk3uXQBDapbDFlR17ivpM6B1ux0fHG.jpg"
                                    }
                                    borderRadius="lg"
                                  />
                                )}
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
                                <Text
                                  onClick={() =>
                                    navigate(`/singleDoctor?id=${doctor.id}`)
                                  }
                                  _hover={{
                                    color: colors.primary,
                                  }}
                                  textAlign="center"
                                  pt="4px"
                                  cursor="pointer"
                                  color={colors.secondary}
                                  fontWeight="500"
                                  fontSize="14px"
                                >
                                  Click for more
                                </Text>
                              </CardBody>
                              <CardFooter margin="0 auto" padding="0px 24px">
                                {role !== "Doctor" && (
                                  <Box mb="3rem">
                                    {!userName ? (
                                      <SignInModal
                                        bg={"#e12454"}
                                        isOpen={isOpen}
                                        onClose={onClose}
                                        name={"Make an Appointment"}
                                        color="white"
                                        hoverBg="#223a66"
                                        hoverColor="white"
                                      />
                                    ) : (
                                      <Button
                                        sx={theme.textStyles.a}
                                        onClick={() =>
                                          navigate(
                                            `/appointment?doctorId=${doctor.id}`
                                          )
                                        }
                                      >
                                        Make an Appointment
                                      </Button>
                                    )}
                                  </Box>
                                )}
                              </CardFooter>
                            </Card>
                          </GridItem>
                        ))}

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
                <Box
                  margin="0 auto 2rem"
                  justifyContent="center"
                  alignItems="center"
                  display="flex"
                >
                  {" "}
                  {filteredData && filteredData.length > 0 && (
                    //    {/*         // !Pagination  */}

                    <Pagination
                      filteredData={filteredData}
                      perPage={perPage}
                      page={page}
                      setPage={setPage}
                    />
                  )}
                </Box>
              </Box>
            </Box>
          )}
        </Container>
      </Section>
      <Box margin="5rem 0" padding="3rem 0" className={styles.banner_2}>
        <Banner2 />
      </Box>
    </main>
  );
}
