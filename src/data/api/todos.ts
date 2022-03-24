import { Todo } from '../slices/todos/models';

/* eslint-disable no-unused-vars */
export const fetchTodos = async (): Promise<Todo[]> =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve([
                { name: 'AAAAA', deadline: '2000-04-12T12:34' },
                { name: 'BBBBB', deadline: '2000-04-12T12:34' },
            ]);
        }, 300);
    });

export const patchTodo = async (payload: Todo) => {};
