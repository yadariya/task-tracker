import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserInfoState {
  username: string;
  email: string;
  role: string;
  id: string;
}

const initialState: UserInfoState = {
  username: '',
  email: '',
  role: '',
  id: '',
};

export const userInfoSlice = createSlice({
  name: 'userInfo',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<Omit<UserInfoState, 'id'>>) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const { setUserInfo } = userInfoSlice.actions;
export default userInfoSlice.reducer;
