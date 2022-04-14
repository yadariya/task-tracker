import React from 'react';
import { useNavigate } from 'react-router-dom';
import ListItem from './ListItem';
import {
  TodosControlsStyled,
  TodosHeaderCellStyled,
  TodosHeadingRowStyled,
  TodosTableStyled,
} from './styled/TodosList.styled';
import { ButtonStyled } from '../../../components/Form/styled/Button.styled';
import { BoxStyled } from '../../../components/Layout/Box.styled';
import { Todo } from '../../../data/slices/todos/models';

interface Props {
  todos: Todo[];
}

const TodosList: React.FC<Props> = ({ todos }) => {
  const navigate = useNavigate();
  return (
    <BoxStyled>
      <TodosControlsStyled>
        <ButtonStyled onClick={() => navigate('/new-todo')}>Add todo</ButtonStyled>
      </TodosControlsStyled>
      <TodosTableStyled>
        <TodosHeadingRowStyled>
          <TodosHeaderCellStyled>Type</TodosHeaderCellStyled>
          <TodosHeaderCellStyled>Title</TodosHeaderCellStyled>
          <TodosHeaderCellStyled>Due date</TodosHeaderCellStyled>
          <TodosHeaderCellStyled>Tags</TodosHeaderCellStyled>
          <TodosHeaderCellStyled> </TodosHeaderCellStyled>
          <TodosHeaderCellStyled> </TodosHeaderCellStyled>
        </TodosHeadingRowStyled>

        {todos.map((todo) => (
          <ListItem key={todo.id} todo={todo} />
        ))}
      </TodosTableStyled>
    </BoxStyled>
  );
};

export default TodosList;
