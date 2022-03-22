import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Landing from './components/Landing/Landing';
import Login from './pages/authentication/Login/Login';
import Register from './pages/authentication/Register/Register';
import List from './pages/List/List';
import Settings from './pages/Settings/Settings';
import TodoForm from './pages/TodoForm/TodoForm';
import { RootState } from './store/store';

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.authentication.loggedIn);

  if (!isLoggedIn) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>

    );
  }

  return (
    <Landing>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/new-todo" element={<TodoForm />} />
        <Route path="/edit-todo/:id" element={<TodoForm />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Landing>
  );
};

export default App;
