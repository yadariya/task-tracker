import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../data/slices/authenticationSlice';
import todosReducer from '../data/slices/todos/todosSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    todos: todosReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
