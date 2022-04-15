import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { changePassword } from '../../../data/api/user';
import { RootState } from '../../../store/store';
import { InputStyled, InputLabelStyled, InputBlock } from '../../Form/styled/Input.styled';
import CodeLine from '../../Typography/CodeLine';
import {
  SettingsFormStyled,
  FieldErrorStyled,
  SubmitStyled,
  FormErrorStyled,
  FormSuccessStyled,
} from './styled/SettingsForm.styled';

type PasswordFormFieldName = 'oldpassword' | 'newpassword' | 'repeatpassword';

const PasswordChangeForm: React.FC = () => {
  const token = useSelector((state: RootState) => state.authentication.accessToken);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isDirty, isValid },
  } = useForm({ mode: 'onChange' });

  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);

  const submit = (data: { [key in PasswordFormFieldName]?: string }) => {
    if (data.newpassword !== data.repeatpassword) {
      setError('repeatpassword', { message: 'Passwords should match' }, { shouldFocus: true });
      return;
    }
    if (data.oldpassword === data.newpassword) {
      setError(
        'newpassword',
        { message: 'Old and new passwords must be different' },
        { shouldFocus: true },
      );
      return;
    }

    changePassword(token!, data.oldpassword!, data.newpassword!)
      .then(() => {
        setSuccess(true);
        setFormError('');
      })
      .catch((error) => {
        setFormError(error.response?.data.detail || 'An unknown error occured.');
        setSuccess(false);
      });
  };

  return (
    <SettingsFormStyled onSubmit={handleSubmit(submit)}>
      <InputBlock>
        <InputLabelStyled>Old password</InputLabelStyled>
        <InputStyled
          type="password"
          {...register('oldpassword', {
            required: { value: true, message: 'Please, enter your old password' },
          })}
        />
        {errors.oldpassword && <FieldErrorStyled>{errors.oldpassword.message}</FieldErrorStyled>}
      </InputBlock>
      <InputBlock>
        <InputLabelStyled>New password</InputLabelStyled>
        <InputStyled
          type="password"
          {...register('newpassword', {
            required: { value: true, message: 'Please, enter the new password' },
            minLength: { value: 8, message: 'Password must be at least 8 symbols in length' },
          })}
        />
        {errors.newpassword && <FieldErrorStyled>{errors.newpassword.message}</FieldErrorStyled>}
      </InputBlock>
      <InputBlock>
        <InputLabelStyled>Repeat password</InputLabelStyled>
        <InputStyled
          type="password"
          {...register('repeatpassword', {
            required: { value: true, message: 'Please, repeat the password' },
          })}
        />
        {errors.repeatpassword && (
          <FieldErrorStyled>{errors.repeatpassword.message}</FieldErrorStyled>
        )}
      </InputBlock>
      {formError && (
        <FormErrorStyled>
          Error: <CodeLine>{formError}</CodeLine>
        </FormErrorStyled>
      )}
      {success && <FormSuccessStyled>Password changed successfully!</FormSuccessStyled>}
      <SubmitStyled type="submit" disabled={!isDirty || !isValid}>
        Reset
      </SubmitStyled>
    </SettingsFormStyled>
  );
};

export default PasswordChangeForm;
