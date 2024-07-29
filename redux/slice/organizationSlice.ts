import { Organizations, organization } from '@/app/types/organization';
import { createSlice } from '@reduxjs/toolkit';

type OrganizationState = {
  selectedOrganization: organization | null;
  organizations: Organizations;
};

const initialState: OrganizationState = {
  selectedOrganization: null,
  organizations: [],
};

export const organizationSlice = createSlice({
  name: 'organization',
  initialState,
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
