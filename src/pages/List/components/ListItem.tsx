import dayjs from 'dayjs';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import DeleteIcon from '../../../components/icons/DeleteIcon';
import EditIcon from '../../../components/icons/EditIcon';
import TagIcon, { TagIconLabel } from '../../../components/icons/TagIcon';
import TodoStatusIcon from '../../../components/icons/TodoStatusIcon';
import { Todo } from '../../../data/slices/todos/models';
import { deleteTodoAction } from '../../../data/slices/todos/todosSlice';
import { Tags } from '../../../store/models';
import { IconCellStyled, TodosCellStyled, TodosRowStyled } from './styled/TodosList.styled';

interface Props {
  todo: Todo;
}

const ListItem: React.FC<Props> = ({ todo }) => {
  const tag = Tags.find((t) => todo.tag === t.slug);
  const [labelVisible, setLabelVisible] = React.useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <TodosRowStyled>
      <TodosCellStyled>
        <TodoStatusIcon completed={todo.completed} />
      </TodosCellStyled>
      <TodosCellStyled>{todo.name}</TodosCellStyled>
      <TodosCellStyled>{dayjs(todo.deadline).format('DD/MM/YYYY')}</TodosCellStyled>
      <TodosCellStyled>
        <TagIcon
          tag={tag}
          onMouseEnter={() => setLabelVisible(true)}
          onMouseLeave={() => setLabelVisible(false)}
        >
          {labelVisible && <TagIconLabel text={tag?.name}>{tag?.name}</TagIconLabel>}
        </TagIcon>
      </TodosCellStyled>
      <IconCellStyled onClick={() => navigate(`/edit-todo/${todo.name}`)}>
        <EditIcon />
      </IconCellStyled>
      <IconCellStyled onClick={() => dispatch(deleteTodoAction(todo.name))}>
        <DeleteIcon />
      </IconCellStyled>
    </TodosRowStyled>
  );
};

export default ListItem;
