/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import dayjs from 'dayjs';
import {
    InputStyled,
    InputLabelStyled,
    InputBlock,
    InputerrorStyled,
    TextAreaStyled,
} from '../../components/Form/Input';
import { BoxStyled } from '../../components/Layout/Box.styled';
import PageHeadingStyled from '../../components/Typography/PageHeading';
import {
    FormStyled,
    SubmitStyled,
    TodoFormHeaderStyled,
    TodoFormWrapperStyled,
} from './styled/TodoForm.styled';
import SelectStyled from '../../components/Form/Select';

const TodoForm: React.FC = () => {
    const location = useLocation();
    const defaultValues = {
        title: '',
        deadline: dayjs(new Date()).format('YYYY-MM-DDThh:mm'),
        tag: '',
        description: '',
    };
    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<typeof defaultValues>({
        mode: 'onChange',
        defaultValues,
    });
    const type = location.pathname === '/new-todo' ? 'add' : 'edit';
    const submit = (data: typeof defaultValues) => {
        console.log(data);
    };

    return (
        <TodoFormWrapperStyled>
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
                        <InputLabelStyled>Title</InputLabelStyled>
                        <InputStyled
                            type="text"
                            {...register('title', { required: true })}
                        />
                        <InputerrorStyled>
                            {errors.title?.message}
                        </InputerrorStyled>
                    </InputBlock>

                    <InputBlock style={{ gridArea: 'deadline' }}>
                        <InputLabelStyled>Deadline</InputLabelStyled>
                        <InputStyled
                            type="datetime-local"
                            {...register('deadline', { required: true })}
                        />
                        <InputerrorStyled>
                            {errors.deadline?.message}
                        </InputerrorStyled>
                    </InputBlock>

                    <InputBlock style={{ gridArea: 'tag' }}>
                        <InputLabelStyled>Tag</InputLabelStyled>
                        <SelectStyled
                            style={{ gridArea: 'tag' }}
                            {...register('tag')}
                        >
                            <option value="gg">GG</option>
                        </SelectStyled>
                        <InputerrorStyled>
                            {errors.deadline?.message}
                        </InputerrorStyled>
                    </InputBlock>

                    <InputBlock style={{ gridArea: 'description' }}>
                        <InputLabelStyled>Description</InputLabelStyled>
                        <TextAreaStyled {...register('description')} />
                        <InputerrorStyled>
                            {errors.title?.message}
                        </InputerrorStyled>
                    </InputBlock>

                    <SubmitStyled
                        style={{ gridArea: 'submit' }}
                        type="submit"
                        disabled={!isValid}
                    >
                        {' '}
                        Submit{' '}
                    </SubmitStyled>
                </FormStyled>
            </BoxStyled>
        </TodoFormWrapperStyled>
    );
};

export default TodoForm;
