// selectedFiltersSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedDoctorTypes: [],
  selectedDepartments: [],
};


const selectedFiltersSlice = createSlice({
  name: "selectedFilters",
  initialState,
  reducers: {
    toggleFilter: (state, action) => {
      const { id, type } = action.payload;

      const index = state[type].indexOf(id);

      if (index !== -1) {
        state[type] = state[type].filter((item) => item !== id);
      } else {
        state[type] = [...state[type], id];
      }
    },
    setInitialFilters: (state, action) => {
      const { selectedDoctorTypes, selectedDepartments } = action.payload;
      state.selectedDoctorTypes = selectedDoctorTypes;
      state.selectedDepartments = selectedDepartments;
    },
  },


});

export const { toggleFilter,setInitialFilters } = selectedFiltersSlice.actions;
export default selectedFiltersSlice;
