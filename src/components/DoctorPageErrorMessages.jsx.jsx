import React from "react";
import { Text, GridItem, Box } from "@chakra-ui/react";
import { colors } from "./Constants";

const Errors = ({
  doctorType,
  doctorTypeError,
  doctorTypeLoading,
  department,
  departmentError,
  departmentLoading,
  doctor,
  doctorError,
  doctorLoading,
  filteredData,
  selectedFilters,
  searchTerm,
}) => {
  return (
    <GridItem
      colSpan={3}
      w="100%"
      color={colors.primary}
      fontWeight="700"
      fontSize="28px"
      textAlign="center"
      margin="0 auto"
    >
      {doctorType?.data == null && doctorTypeError == null && doctorTypeLoading}

      {department?.data == null && departmentError == null && departmentLoading}

      {doctor?.data?.totalCount === 0 && <Text as="h1">No doctors ...</Text>}

      {doctor?.data == null && doctorError == null && doctorLoading}
      <Box
        w="100%"
        color={colors.primary}
        fontWeight="700"
        fontSize="28px"
        textAlign="center"
        margin="0rem auto"
      >
        {doctor == null && doctorError != null && (
          <Text margin="2rem 0" as="h1">
            Failed to get doctors
          </Text>
        )}
      </Box>
      {filteredData?.length === 0 && doctor?.data?.totalCount !== 0 && (
        <>
          {searchTerm && (
            <Text textAlign="start" as="h1">
              {selectedFilters.selectedDepartments.length !== 0 ||
              selectedFilters.selectedDoctorTypes.length !== 0
                ? `There are no items matching for the selected filters.`
                :  <span>There are no items matching for "<span style={{ color: 'black' }}>{searchTerm}</span>"</span>}
            </Text>
          )}
          {!searchTerm && (
            <Text as="h1">No items found for the selected filters.</Text>
          )}
        </>
      )}
    </GridItem>
  );
};

export default Errors;
