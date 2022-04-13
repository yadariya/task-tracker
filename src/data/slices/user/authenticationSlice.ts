import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useStorage } from '../../../store/persist';

export interface AuthenticationState {
  accessToken: string | null;
}

const [loadAuth] = useStorage<AuthenticationState>('auth');

const initialState: AuthenticationState = loadAuth() || {
  accessToken: null,
};

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logIn: (state, action: PayloadAction<string>) => ({ ...state, accessToken: action.payload }),
    logOut: (state) => ({ ...state, accessToken: null }),
  },
});

export const { logIn, logOut } = authenticationSlice.actions;
export default authenticationSlice.reducer;
