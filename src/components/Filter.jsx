// FilterComponent.js
import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControl,
  Grid,
  GridItem,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  setInitialFilters,
  toggleFilter,
} from "../redux/slices/selectedFiltersSlice"


export default function FilterComponent({
  doctorTypeLoading,
  doctorType,
  doctorTypeError,
  departmentLoading,
  department,
  departmentError,
  doctorLoading,
  doctorError,
  originalData,
}) {
  const dispatch = useDispatch();
  const selectedFiltersRedux = useSelector((state) => state.selectedFilters);

  const [selectedFilters, setSelectedFilters] = useState(() => {
    return {
      selectedDoctorTypes: [],
      selectedDepartments: [],
    
    };
  });

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

  const filteredData = originalData?.filter((doctor) => {
    const nameMatches = doctor?.fullName
      ?.toLowerCase()
      .includes(selectedFilters.searchTerm.toLowerCase());

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

  return (
    <Box>
      <Grid
        margin="3rem -1rem"
        templateRows="repeat(1, 1fr)"
        templateColumns="repeat(4, 1fr)"
        gap={4}
      >
        <GridItem padding="0 20px" rowSpan={5} colSpan={1}>
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
            <Stack spacing={5} direction="column" key={type.id}>
              <FormControl
                isDisabled={
                  doctorLoading || doctorError || doctor?.length === 0
                }
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
                  <Text textAlign="center" fontWeight="400" fontSize="17px">
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
        </GridItem>
        <GridItem padding="0 20px" rowSpan={5} colSpan={1}>
          <Text
            fontSize="lg"
            fontWeight="600"
            color={colors.primary}
            textAlign="center"
            margin="20px 0"
          >
            Departments
          </Text>
          {department?.data?.map((dep) => (
            <Stack spacing={5} direction="column" key={dep.id}>
              <FormControl
                isDisabled={
                  doctorLoading || doctorError || doctor?.length === 0
                }
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
      </Grid>
    </Box>
  );
}
