import { createSlice } from '@reduxjs/toolkit';

export const organizationSlice = createSlice({
  name: 'organization',
  initialState: {
    selectedOrganization: null,
    organizations: [],
  },
  reducers: {
    setSelectedOrganization: (state, action) => {
      state.selectedOrganization = action.payload;
    },
    setOrganizations: (state, action) => {
      state.organizations = action.payload;
    },
  },
});

export const { setSelectedOrganization, setOrganizations } = organizationSlice.actions;
export default organizationSlice.reducer;
