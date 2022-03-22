import { createSlice } from '@reduxjs/toolkit';

export interface AuthenticationState {
  loggedIn: boolean;
}

const initialState: AuthenticationState = {
  loggedIn: true,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logIn: (state) => {
      state.loggedIn = true;
    },
    logOut: (state) => {
      state.loggedIn = false;
    },
  },
});

export const { logIn, logOut } = authenticationSlice.actions;
export default authenticationSlice.reducer;
