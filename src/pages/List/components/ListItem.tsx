import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import TodoStatusIcon from '../../../components/icons/TodoStatusIcon';
import Tag from '../../../components/Tag/Tag';
import { Todo } from '../../../data/slices/todos/models';
import { deleteTodoAction } from '../../../data/slices/todos/todosSlice';
import { useTypedSelector } from '../../../store/hooks';
import { Tags } from '../../../store/models';
import { RootState } from '../../../store/store';
import { IconCellStyled, TodosCellStyled, TodosRowStyled } from './styled/TodosList.styled';

interface Props {
  todo: Todo;
}

const ListItem: React.FC<Props> = ({ todo }) => {
  const tags = todo.tags.map((tag) => Tags.find((t) => t.slug === tag));
  const token = useTypedSelector((state: RootState) => state.authentication.accessToken);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!token) {
    return <h1>Loading...</h1>;
  }

  return (
    <TodosRowStyled>
      <TodosCellStyled>
        <TodoStatusIcon completed={todo.status === 'DONE'} />
      </TodosCellStyled>
      <TodosCellStyled>{todo.name}</TodosCellStyled>
      <TodosCellStyled>{dayjs(todo.deadline).format('DD/MM/YYYY')}</TodosCellStyled>
      <TodosCellStyled>
        {tags.map((tag) => (
          <Tag key={tag?.slug} tag={tag} />
        ))}
      </TodosCellStyled>
      <IconCellStyled onClick={() => navigate(`/edit-todo/${todo.id}`)}>
        <EditIcon />
      </IconCellStyled>
      <IconCellStyled onClick={() => dispatch(deleteTodoAction({ token, data: todo.id }))}>
        <DeleteIcon />
      </IconCellStyled>
    </TodosRowStyled>
  );
};

export default ListItem;
