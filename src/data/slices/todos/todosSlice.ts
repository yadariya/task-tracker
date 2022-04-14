import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { FetchingStatus } from '../../../store/models';
import { createTodo, deleteTodo, fetchTodo, fetchTodos, patchTodo } from '../../api/todos';
import { Todo } from './models';

interface TodosState {
  todos: Todo[];
  todosFetchingStatus: FetchingStatus;
  editedTodo: Todo;
  editedTodoFetchingStatus: FetchingStatus;
  todoPatchingStatus: FetchingStatus;
  todoCreatingStatus: FetchingStatus;
  todoDeletingStatus: FetchingStatus;
}

const initialState: TodosState = {
  todos: [],
  editedTodo: {
    id: '',
    name: '',
    deadline: dayjs(new Date()).format('YYYY-MM-DDThh:mm'),
    tags: [],
    description: '',
    status: 'TODO',
  },
  todosFetchingStatus: 'idle',
  editedTodoFetchingStatus: 'idle',
  todoPatchingStatus: 'idle',
  todoCreatingStatus: 'idle',
  todoDeletingStatus: 'idle',
};

interface AuthPayload<T> {
  token: string;
  data: T;
}

export const fetchTodosAction = createAsyncThunk(
  'todos/fetch',
  async ({ token }: AuthPayload<undefined>) => {
    const data = await fetchTodos(token);
    return data;
  },
);

export const fetchTodoAction = createAsyncThunk(
  'todo/fetch',
  async ({ token, data }: AuthPayload<string>) => {
    const res = await fetchTodo(token, data);
    return res;
  },
);

export const patchTodoAction = createAsyncThunk(
  'todo/patch',
  async ({ token, data }: AuthPayload<Todo>) => {
    await patchTodo(token, data);
  },
);
export const createTodoAction = createAsyncThunk(
  'todo/create',
  async ({ token, data }: AuthPayload<Todo>) => {
    await createTodo(token, data);
  },
);
export const deleteTodoAction = createAsyncThunk(
  'todo/delete',
  async ({ token, data }: AuthPayload<string>) => {
    await deleteTodo(token, data);
    return data;
  },
);

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    resetTodoEditForm: (state) => {
      state.editedTodo = {
        id: '',
        name: '',
        deadline: dayjs(new Date()).format('YYYY-MM-DDThh:mm'),
        tags: [],
        description: '',
        status: 'TODO',
      };
      state.editedTodoFetchingStatus = 'idle';
      state.todoPatchingStatus = 'idle';
      state.todoCreatingStatus = 'idle';
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTodosAction.pending, (state) => {
        state.todosFetchingStatus = 'loading';
      })
      .addCase(fetchTodosAction.fulfilled, (state, action) => {
        state.todosFetchingStatus = 'succeeded';
        state.todos = action.payload;
      })
      .addCase(fetchTodosAction.rejected, (state) => {
        state.todosFetchingStatus = 'failed';
      })
      .addCase(fetchTodoAction.pending, (state) => {
        state.editedTodoFetchingStatus = 'loading';
      })
      .addCase(fetchTodoAction.fulfilled, (state, action) => {
        state.editedTodoFetchingStatus = 'succeeded';
        state.editedTodo = action.payload;
      })
      .addCase(fetchTodoAction.rejected, (state) => {
        state.editedTodoFetchingStatus = 'failed';
      })
      .addCase(patchTodoAction.pending, (state) => {
        state.todoPatchingStatus = 'loading';
      })
      .addCase(patchTodoAction.fulfilled, (state) => {
        state.todoPatchingStatus = 'succeeded';
      })
      .addCase(patchTodoAction.rejected, (state) => {
        state.todoPatchingStatus = 'failed';
      })
      .addCase(createTodoAction.pending, (state) => {
        state.todoPatchingStatus = 'loading';
      })
      .addCase(createTodoAction.fulfilled, (state) => {
        state.todoPatchingStatus = 'succeeded';
      })
      .addCase(createTodoAction.rejected, (state) => {
        state.todoPatchingStatus = 'failed';
      })
      .addCase(deleteTodoAction.pending, (state) => {
        state.todoDeletingStatus = 'loading';
      })
      .addCase(deleteTodoAction.fulfilled, (state, action) => {
        state.todoDeletingStatus = 'succeeded';
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodoAction.rejected, (state) => {
        state.todoDeletingStatus = 'failed';
      });
  },
});

export const { resetTodoEditForm } = todosSlice.actions;

export default todosSlice.reducer;
