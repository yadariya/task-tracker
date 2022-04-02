import React from 'react';
import { useDispatch } from 'react-redux';
import { LayoutContentsStyled } from '../../components/Layout/styled/MainLayout.styled';
import { selectAllTodos, selectTodosFetchingStatus } from '../../data/slices/todos/selectors';
import { fetchTodosAction } from '../../data/slices/todos/todosSlice';
import { useTypedSelector } from '../../store/hooks';
import TodosList from './components/TodosList';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useTypedSelector(selectAllTodos);
  const fetchingStatus = useTypedSelector(selectTodosFetchingStatus);

  React.useEffect(() => {
    if (fetchingStatus === 'idle') {
      dispatch(fetchTodosAction());
    }
  }, [fetchingStatus]);

  if (fetchingStatus !== 'succeeded') {
    return <h3>Loading</h3>;
  }

  return (
    <LayoutContentsStyled>
      <TodosList todos={todos} />
    </LayoutContentsStyled>
  );
};

export default List;
