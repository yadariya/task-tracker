import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import TodoStatusIcon from '../../../components/icons/TodoStatusIcon';
import { Todo } from '../../../data/slices/todos/models';
import { patchTodoAction } from '../../../data/slices/todos/todosSlice';
import { useTypedSelector } from '../../../store/hooks';
import { RootState } from '../../../store/store';

interface Props {
  todo: Todo;
}

const TodoStatusToggle: React.FC<Props> = ({ todo }) => {
  const token = useTypedSelector((state: RootState) => state.authentication.accessToken);
  const dispatch = useDispatch();
  const [status, setStatus] = useState(todo.status);

  if (!token) {
    return <div></div>;
  }

  const toggleTodoStatus = () => {
    const newStatus = status == 'DONE' ? 'TODO' : 'DONE';
    dispatch(patchTodoAction({ token, data: { ...todo, status: newStatus } }));
    setStatus(newStatus);
  };

  return (
    <div onClick={toggleTodoStatus}>
      <TodoStatusIcon completed={status === 'DONE'} />
    </div>
  );
};

export default TodoStatusToggle;
