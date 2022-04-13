import { configureStore } from '@reduxjs/toolkit';
import authenticationReducer from '../data/slices/user/authenticationSlice';
import todosReducer from '../data/slices/todos/todosSlice';
import userInfoReducer from '../data/slices/user/userInfoSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    todos: todosReducer,
    userInfo: userInfoReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
