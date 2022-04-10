import axios from 'axios';
import getEnv from '../../utils/getEnv';
import { Todo } from '../slices/todos/models';

const TASKS_BASE_URL = `${getEnv('API_ROOT')}`;

/* eslint-disable no-unused-vars */
export const fetchTodos = async (token: string): Promise<Todo[]> => {
  const res = await axios.get<{ tasks: Todo[] }>(`${TASKS_BASE_URL}/tasks`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.tasks;
};

export const fetchTodo = async (token: string, data: string): Promise<Todo> => {
  const res = await axios.get<Todo>(`${TASKS_BASE_URL}/tasks/${data}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const patchTodo = async (token: string, data: Todo): Promise<void> => {
  await axios.patch(
    `${TASKS_BASE_URL}/tasks/${data.id}`,
    {
      ...data,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const createTodo = async (token: string, data: Todo): Promise<void> => {
  await axios.post(
    `${TASKS_BASE_URL}/tasks/new`,
    {
      ...data,
    },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
};

export const deleteTodo = async (token: string, data: string): Promise<void> => {
  await axios.delete(`${TASKS_BASE_URL}/tasks/${data}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
