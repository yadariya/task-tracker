import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectAllTodos, selectTodosFetchingStatus } from '../../data/slices/todos/selectors';
import { fetchTodosAction } from '../../data/slices/todos/todosSlice';
import { useTypedSelector } from '../../store/hooks';

const List: React.FC = () => {
  const dispatch = useDispatch();
  const todos = useTypedSelector(selectAllTodos);
  const fetchingStatus = useTypedSelector(selectTodosFetchingStatus);

  React.useEffect(() => {
    if (fetchingStatus === 'idle') {
      dispatch(fetchTodosAction());
    }
  }, [fetchingStatus]);

  return (
    <div>
      <Link to="/new-todo">Add todo</Link>
      {fetchingStatus === 'loading'
        && <h3>Loading</h3>}
      {fetchingStatus === 'succeeded'
        && (
        <ol>
          {todos.map((todo) => (
            <li key={todo.name}>
              {todo.name}
              {' '}
              -
              {' '}
              {dayjs(todo.deadline).format('YYYY.MM.DD hh:mm')}
            </li>
          ))}
        </ol>
        )}
    </div>
  );
};

export default List;
