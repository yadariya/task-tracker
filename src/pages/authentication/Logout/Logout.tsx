import { Navigate } from 'react-router';
import { logOut } from '../../../data/slices/authenticationSlice';
import { store } from '../../../store/store';

export default function Logout() {
  store.dispatch(logOut());
  return <Navigate to="/" />;
}
