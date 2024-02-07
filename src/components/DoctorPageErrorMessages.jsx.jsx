import React from "react";
import { Text, GridItem } from "@chakra-ui/react";
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
      {doctorType == null && doctorTypeError == null && doctorTypeLoading}

      {department == null && departmentError == null && departmentLoading}

      {doctor?.length === 0 && <Text as="h1">No doctors ...</Text>}

      {doctor == null && doctorError == null && doctorLoading}

      {filteredData?.length === 0 && doctor?.length !== 0 && (
        <>
          {searchTerm && (
            <Text textAlign="start" as="h1">
              {selectedFilters.selectedDepartments.length !== 0 ||
              selectedFilters.selectedDoctorTypes.length !== 0
                ? `There are no items matching for the selected filters.`
                : `There are no items matching.`}
            </Text>
          )}
          {!searchTerm && (
            <Text as="h1">
              {selectedFilters.selectedDepartments.length !== 0 ||
              selectedFilters.selectedDoctorTypes.length !== 0
                ? "No items found for the selected filters."
                : "No items found."}
            </Text>
          )}
        </>
      )}
    </GridItem>
  );
};

export default Errors;
