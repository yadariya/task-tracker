import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
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
  fetchTodosAction,
  patchTodoAction,
  resetTodoEditForm,
} from '../../data/slices/todos/todosSlice';
import { RootState } from '../../store/store';
import { useTypedSelector } from '../../store/hooks';
import { TodoForm as TodoFormModel } from '../../data/slices/todos/models';
import { ButtonStyled } from '../../components/Form/Button';

const TodoForm: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const editedTodoFetchingStatus = useSelector(selectEditedTodoFetchingStatus);
  const todoPatchingStatus = useSelector(selectTodoPatchingStatus);
  const todoCreatingStatuss = useSelector(selectTodoCreatingStatus);
  const token = useTypedSelector((state: RootState) => state.authentication.accessToken);
  const dispatch = useDispatch();
  const defaultValues = useSelector(selectEditedTodo);
  const type = location.pathname === '/new-todo' ? 'add' : 'edit';
  const { id } = useParams();

  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<TodoFormModel>({
    mode: 'onChange',
    defaultValues,
  });

  const { fields, append } = useFieldArray({
    name: 'tags',
    control,
  });

  React.useEffect(() => {
    if (type === 'edit' && token) {
      if (id) {
        dispatch(fetchTodoAction({ token, data: id }));
      }
    }

    return () => {
      dispatch(resetTodoEditForm());
    };
  }, [type]);

  React.useEffect(() => {
    if ((todoPatchingStatus === 'succeeded' || todoCreatingStatuss === 'succeeded') && token) {
      dispatch(fetchTodosAction({ token, data: undefined }));
      navigate('/');
    }
  }, [todoPatchingStatus, todoCreatingStatuss]);

  React.useEffect(() => {
    if (type === 'edit' && editedTodoFetchingStatus === 'succeeded') {
      setValue('id', defaultValues.id);
      setValue('name', defaultValues.name, { shouldValidate: true });
      setValue('tags', defaultValues.tags, { shouldValidate: true });
      setValue('deadline', defaultValues.deadline, { shouldValidate: true });
      setValue('description', defaultValues.description, { shouldValidate: true });
    }
  }, [editedTodoFetchingStatus]);

  const submit = (data: typeof defaultValues) => {
    data.tags = data.tags.filter((_, i, a) => a.findIndex((v) => v.value === a[i].value) === i); // get only unique tags

    if (type === 'edit' && token) {
      dispatch(patchTodoAction({ token, data }));
    } else if (token) {
      dispatch(createTodoAction({ token, data }));
    }
  };

  if (type === 'edit' && editedTodoFetchingStatus !== 'succeeded') {
    return (
      <LayoutContentsStyled>
        <PageHeadingStyled>Loading...</PageHeadingStyled>
      </LayoutContentsStyled>
    );
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
          <InputBlock
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 3,
            }}
          >
            <InputLabelStyled>Name</InputLabelStyled>
            <InputStyled type="text" {...register('name', { required: true })} />
            <InputerrorStyled>{errors.name?.message}</InputerrorStyled>
          </InputBlock>

          <InputBlock
            style={{
              gridColumnStart: 3,
              gridColumnEnd: 4,
            }}
          >
            <InputLabelStyled>Deadline</InputLabelStyled>
            <InputStyled type="datetime-local" {...register('deadline', { required: true })} />
            <InputerrorStyled>{errors.deadline?.message}</InputerrorStyled>
          </InputBlock>

          {fields.map((tag, idx) => (
            <InputBlock key={tag.id}>
              <InputLabelStyled>Tag</InputLabelStyled>
              <SelectStyled style={{ gridArea: 'tag' }} {...register(`tags.${idx}.value`)}>
                <option value=""> </option>
                <option value="work">Work</option>
                <option value="study">Study</option>
              </SelectStyled>
              <InputerrorStyled>{errors.deadline?.message}</InputerrorStyled>
            </InputBlock>
          ))}

          <ButtonStyled
            style={{ width: '50px' }}
            type="button"
            onClick={() => append({ value: '' })}
          >
            Add tag
          </ButtonStyled>

          <InputBlock
            style={{
              gridColumnStart: 1,
              gridColumnEnd: 4,
            }}
          >
            <InputLabelStyled>Description</InputLabelStyled>
            <TextAreaStyled {...register('description')} />
            <InputerrorStyled>{errors.description?.message}</InputerrorStyled>
          </InputBlock>

          {todoPatchingStatus === 'loading' || todoCreatingStatuss === 'loading' ? (
            <SubmitStyled
              style={{
                gridColumnStart: 2,
                gridColumnEnd: 3,
              }}
              type="submit"
              disabled
            >
              Loading...
            </SubmitStyled>
          ) : (
            <SubmitStyled
              style={{
                gridColumnStart: 2,
                gridColumnEnd: 3,
              }}
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
