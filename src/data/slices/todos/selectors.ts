/* eslint-disable max-len */
import { RootState } from '../../../store/store';

export const selectAllTodos = (state: RootState) => state.todos.todos;
export const selectTodoByName = (state: RootState, name: string) =>
    state.todos.todos.find((todo) => todo.name === name);
export const selectTodosFetchingStatus = (state: RootState) =>
    state.todos.todosfetchingStatus;
