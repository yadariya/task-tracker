import React, { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  InputStyled,
  InputLabelStyled,
  InputBlock,
  InputerrorStyled,
  TextAreaStyled,
} from '../../components/Form/styled/Input.styled';
import { BoxStyled } from '../../components/Layout/Box.styled';
import PageHeadingStyled from '../../components/Typography/PageHeading.styled';
import { FormStyled, SubmitStyled, TodoFormHeaderStyled } from './styled/TodoForm.styled';
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
import { Todo } from '../../data/slices/todos/models';
import MultichoiceDropdown from '../../components/Form/MultichoiceDropdown';
import { Tags } from '../../store/models';

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

  const [tags, setTags] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Todo>({
    mode: 'onChange',
    defaultValues,
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
      setValue('deadline', defaultValues.deadline, { shouldValidate: true });
      setValue('description', defaultValues.description, { shouldValidate: true });

      setTags(defaultValues.tags);
    }
  }, [editedTodoFetchingStatus]);

  React.useEffect(() => {
    setValue('tags', tags, { shouldValidate: true });
  }, [tags]);

  const submit = (data: typeof defaultValues) => {
    data.tags = data.tags.filter((v, i, a) => a.indexOf(v) === i); // get only unique tags

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
          <InputBlock>
            <InputLabelStyled>Name</InputLabelStyled>
            <InputStyled type="text" {...register('name', { required: true })} />
            <InputerrorStyled>{errors.name?.message}</InputerrorStyled>
          </InputBlock>

          <InputBlock>
            <InputLabelStyled>Deadline</InputLabelStyled>
            <InputStyled type="datetime-local" {...register('deadline', { required: true })} />
            <InputerrorStyled>{errors.deadline?.message}</InputerrorStyled>
          </InputBlock>

          <InputBlock>
            <InputLabelStyled>Tags</InputLabelStyled>
            <MultichoiceDropdown
              items={Object.fromEntries(Tags.map((tag) => [tag.name, tag.slug]))}
              setParentState={setTags}
              initialState={tags}
              autoheader="values"
              header="None selected"
            />
            <InputerrorStyled>{errors.tags}</InputerrorStyled>
          </InputBlock>

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
              disabled={!isValid}
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
