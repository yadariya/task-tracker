import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { logOut } from '../../../data/slices/user/authenticationSlice';
import { store } from '../../../store/store';

const Logout: React.FC = () => {
  useEffect(() => {
    store.dispatch(logOut());
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
