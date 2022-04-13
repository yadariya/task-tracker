import axios from 'axios';
import getEnv from '../../utils/getEnv';
import { UserInfoState } from '../slices/user/userInfoSlice';

const API_ROOT = `${getEnv('API_ROOT')}`;

// Methods not requiring auth

export const authenticateUser = async (username: string, password: string) => {
  const res = await axios.post(`${API_ROOT}/users/authenticate`, { username, password });
  return res.data;
};

export const createUser = async (email: string) => {
  const res = await axios.post(`${API_ROOT}/users/new`, { email });
  return res.data;
};

export const confirmUserCreation = async (
  confirm_token: string,
  user: { [key in 'username' | 'password' | 'role']: string },
) => {
  const res = await axios.post(`${API_ROOT}/users/new/confirm`, { ...user, confirm_token });
  return res.data;
};

export const resetPassword = async (username: string, email: string) => {
  const res = await axios.post(`${API_ROOT}/users/password/reset`, { email });
  return res.data;
};

export const confirmPasswordReset = async (confirm_token: string, password: string) => {
  const res = await axios.post(`${API_ROOT}/users/password/reset/confirm`, {
    confirm_token,
    password,
  });
  return res.data;
};

// Methods requiring auth

export const getUserInfo = async (token: string): Promise<UserInfoState> => {
  const res = await axios.get<UserInfoState>(`${API_ROOT}/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const changeUserInfo = async (access_token: string, info: Omit<UserInfoState, 'id'>) => {
  const res = await axios.patch<UserInfoState>(`${API_ROOT}/users/me`, info, {
    headers: { Authorization: `Bearer ${access_token}` },
  });
  return res.data;
};

export const changePassword = async (
  access_token: string,
  old_password: string,
  new_password: string,
) => {
  const res = await axios.patch(
    `${API_ROOT}/users/me/password`,
    { old_password, new_password },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );
  return res.data;
};

export const confirmEmailChange = async (access_token: string, confirm_token: string) => {
  const res = await axios.patch(
    `${API_ROOT}/users/me/confirm`,
    { confirm_token },
    {
      headers: { Authorization: `Bearer ${access_token}` },
    },
  );
  return res.data;
};
