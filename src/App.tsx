import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginLanding from './components/Layout/LoginLanding';
import MainLanding from './components/Layout/MainLanding';
import Login from './pages/authentication/Login/Login';
import Register from './pages/authentication/Register/Register';
import List from './pages/List/List';
import Settings from './pages/Settings/Settings';
import TodoForm from './pages/TodoForm/TodoForm';
import { RootState } from './store/store';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.authentication.access_token !== null);

  if (!isLoggedIn) {
    return (
      <LoginLanding>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Navigate to="/login"/>} />
        </Routes>
      </LoginLanding>
    );
  }

  return (
    <MainLanding>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/new-todo" element={<TodoForm />} />
        <Route path="/edit-todo/:id" element={<TodoForm />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </MainLanding>
  );
};

export default App;
