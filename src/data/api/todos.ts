import { Todo } from '../slices/todos/models';

/* eslint-disable no-unused-vars */
export const fetchTodos = async (): Promise<Todo[]> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve([
        {
          name: 'AAAAA',
          deadline: '2000-04-12T12:34',
          tag: 'work',
          completed: false,
        },
        {
          name: 'BBBBB',
          deadline: '2000-04-12T12:34',
          tag: 'study',
          completed: true,
        },
      ]);
    }, 300);
  });

export const fetchTodo = async (name: string): Promise<Todo> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: 'AAAAA',
        deadline: '2000-04-12T12:34',
        tag: 'work',
        completed: false,
      });
    }, 300);
  });

export const patchTodo = async (data: Todo): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

export const createTodo = async (data: Todo): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

export const deleteTodo = async (name: string): Promise<void> =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });
