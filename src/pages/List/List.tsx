import React from 'react';
import { useDispatch } from 'react-redux';
import { LayoutContentsStyled } from '../../components/Layout/styled/MainLayout.styled';
import PageHeadingStyled from '../../components/Typography/PageHeading';
import { selectAllTodos, selectTodosFetchingStatus } from '../../data/slices/todos/selectors';
import { fetchTodosAction } from '../../data/slices/todos/todosSlice';
import { useTypedSelector } from '../../store/hooks';
import { RootState } from '../../store/store';
import TodosList from './components/TodosList';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useTypedSelector(selectAllTodos);
  const token = useTypedSelector((state: RootState) => state.authentication.accessToken);
  const fetchingStatus = useTypedSelector(selectTodosFetchingStatus);

  React.useEffect(() => {
    if (fetchingStatus === 'idle' && token) {
      dispatch(fetchTodosAction({ token, data: undefined }));
    }
  }, [fetchingStatus]);

  return (
    <LayoutContentsStyled>
      {fetchingStatus === 'succeeded' ? (
        <TodosList todos={todos} />
      ) : (
        <PageHeadingStyled>Loading...</PageHeadingStyled>
      )}
    </LayoutContentsStyled>
  );
};

export default List;
