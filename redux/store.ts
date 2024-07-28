import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import organizationReducer from './slice/organizationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    organization: organizationReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;