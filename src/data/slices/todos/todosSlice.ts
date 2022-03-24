import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FetchingStatus } from '../../../store/models';
import { fetchTodos } from '../../api/todos';
import { Todo } from './models';

interface TodosState {
    todos: Todo[];
    todosfetchingStatus: FetchingStatus;
}

const initialState: TodosState = {
    todos: [],
    todosfetchingStatus: 'idle',
};

export const fetchTodosAction = createAsyncThunk('todos/fetch', async () => {
    const data = await fetchTodos();
    return data;
});

const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(fetchTodosAction.pending, (state) => {
                state.todosfetchingStatus = 'loading';
            })
            .addCase(fetchTodosAction.fulfilled, (state, action) => {
                state.todosfetchingStatus = 'succeeded';
                state.todos = action.payload;
            })
            .addCase(fetchTodosAction.rejected, (state) => {
                state.todosfetchingStatus = 'failed';
            });
    },
});

export default todosSlice.reducer;
