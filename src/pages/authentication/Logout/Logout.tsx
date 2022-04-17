import { useEffect } from 'react';
import { Navigate } from 'react-router';
import { resetTodos } from '../../../data/slices/todos/todosSlice';
import { logOut } from '../../../data/slices/user/authenticationSlice';
import { clearUserInfo } from '../../../data/slices/user/userInfoSlice';
import { store } from '../../../store/store';

const Logout: React.FC = () => {
  useEffect(() => {
    store.dispatch(logOut());
    store.dispatch(clearUserInfo());
    store.dispatch(resetTodos());
  }, []);

  return <Navigate to="/" />;
};

export default Logout;
