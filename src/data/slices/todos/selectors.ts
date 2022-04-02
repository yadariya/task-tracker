/* eslint-disable max-len */
import { RootState } from '../../../store/store';

export const selectAllTodos = (state: RootState) => state.todos.todos;
export const selectTodoByName = (state: RootState, name: string) =>
  state.todos.todos.find((todo) => todo.name === name);
export const selectTodosFetchingStatus = (state: RootState) => state.todos.todosFetchingStatus;
export const selectEditedTodo = (state: RootState) => state.todos.editedTodo;
export const selectEditedTodoFetchingStatus = (state: RootState) =>
  state.todos.editedTodoFetchingStatus;
export const selectTodoPatchingStatus = (state: RootState) => state.todos.todoPatchingStatus;
export const selectTodoCreatingStatus = (state: RootState) => state.todos.todoCreatingStatus;
