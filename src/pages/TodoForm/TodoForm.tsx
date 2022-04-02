import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  InputStyled,
  InputLabelStyled,
  InputBlock,
  InputerrorStyled,
  TextAreaStyled,
} from '../../components/Form/Input';
import { BoxStyled } from '../../components/Layout/Box.styled';
import PageHeadingStyled from '../../components/Typography/PageHeading';
import { FormStyled, SubmitStyled, TodoFormHeaderStyled } from './styled/TodoForm.styled';
import SelectStyled from '../../components/Form/Select';
import { LayoutContentsStyled } from '../../components/Layout/styled/MainLayout.styled';
import {
  selectEditedTodo,
  selectEditedTodoFetchingStatus,
  selectTodoCreatingStatus,
  selectTodoPatchingStatus,
} from '../../data/slices/todos/selectors';
import {
  createTodoAction,
  fetchTodoAction,
  patchTodoAction,
  resetTodoEditForm,
} from '../../data/slices/todos/todosSlice';

const TodoForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editedTodoFetchingStatus = useSelector(selectEditedTodoFetchingStatus);
  const todoPatchingStatus = useSelector(selectTodoPatchingStatus);
  const todoCreatingStatuss = useSelector(selectTodoCreatingStatus);
  const dispatch = useDispatch();
  const defaultValues = useSelector(selectEditedTodo);
  const type = location.pathname === '/new-todo' ? 'add' : 'edit';
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<typeof defaultValues>({
    mode: 'onChange',
    defaultValues,
  });

  React.useEffect(() => {
    if (type === 'edit') {
      if (id) {
        dispatch(fetchTodoAction(id));
      }
    }

    return () => {
      dispatch(resetTodoEditForm());
    };
  }, [type]);

  React.useEffect(() => {
    if (todoPatchingStatus === 'succeeded' || todoCreatingStatuss === 'succeeded') {
      navigate('/');
    }
  }, [todoPatchingStatus, todoCreatingStatuss]);

  React.useEffect(() => {
    if (type === 'edit' && editedTodoFetchingStatus === 'succeeded') {
      setValue('name', defaultValues.name, { shouldValidate: true });
      setValue('tag', defaultValues.tag, { shouldValidate: true });
      setValue('deadline', defaultValues.deadline, { shouldValidate: true });
      setValue('description', defaultValues.description, { shouldValidate: true });
    }
  }, [editedTodoFetchingStatus]);

  const submit = (data: typeof defaultValues) => {
    if (type === 'edit') {
      dispatch(patchTodoAction(data));
    } else {
      dispatch(createTodoAction(data));
    }
  };

  if (type === 'edit' && editedTodoFetchingStatus !== 'succeeded') {
    return <h1>Loading...</h1>;
  }
  return (
    <LayoutContentsStyled>
      <TodoFormHeaderStyled>
        {type === 'add' ? (
          <PageHeadingStyled>Add todo</PageHeadingStyled>
        ) : (
          <PageHeadingStyled>Edit todo</PageHeadingStyled>
        )}
      </TodoFormHeaderStyled>

      <BoxStyled>
        <FormStyled onSubmit={handleSubmit(submit)}>
          <InputBlock style={{ gridArea: 'title' }}>
            <InputLabelStyled>Name</InputLabelStyled>
            <InputStyled type="text" {...register('name', { required: true })} />
            <InputerrorStyled>{errors.name?.message}</InputerrorStyled>
          </InputBlock>

          <InputBlock style={{ gridArea: 'deadline' }}>
            <InputLabelStyled>Deadline</InputLabelStyled>
            <InputStyled type="datetime-local" {...register('deadline', { required: true })} />
            <InputerrorStyled>{errors.deadline?.message}</InputerrorStyled>
          </InputBlock>

          <InputBlock style={{ gridArea: 'tag' }}>
            <InputLabelStyled>Tag</InputLabelStyled>
            <SelectStyled style={{ gridArea: 'tag' }} {...register('tag')}>
              <option value=""> </option>
              <option value="work">Work</option>
              <option value="study">Study</option>
            </SelectStyled>
            <InputerrorStyled>{errors.deadline?.message}</InputerrorStyled>
          </InputBlock>

          <InputBlock style={{ gridArea: 'description' }}>
            <InputLabelStyled>Description</InputLabelStyled>
            <TextAreaStyled {...register('description')} />
            <InputerrorStyled>{errors.description?.message}</InputerrorStyled>
          </InputBlock>

          {todoPatchingStatus === 'loading' || todoCreatingStatuss === 'loading' ? (
            <SubmitStyled style={{ gridArea: 'submit' }} type="submit" disabled>
              Loading...
            </SubmitStyled>
          ) : (
            <SubmitStyled
              style={{ gridArea: 'submit' }}
              type="submit"
              disabled={!isDirty || !isValid}
            >
              Submit
            </SubmitStyled>
          )}
        </FormStyled>
      </BoxStyled>
    </LayoutContentsStyled>
  );
};

export default TodoForm;
