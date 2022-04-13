import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { InputStyled, InputLabelStyled, InputBlock } from '../../Form/Input';
import {
  SettingsFormStyled,
  FieldErrorStyled,
  SubmitStyled,
  FormErrorStyled,
  FormSuccessStyled,
  FootnoteStyled,
} from './styled/SettingsForm.styled';
import { RootState } from '../../../store/store';
import { useState } from 'react';
import { changeUserInfo } from '../../../data/api/user';
import { setUserInfo, UserInfoState } from '../../../data/slices/user/userInfoSlice';

type UserInfoFormFieldName = keyof Omit<UserInfoState, 'id'>;

const UserInfoForm: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const token = useSelector((state: RootState) => state.authentication.accessToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({ mode: 'onChange' });

  const [formError, setFormError] = useState('');
  const [success, setSuccess] = useState(false);
  const [newEmail, setNewEmail] = useState('');

  const submit = (data: { [key in UserInfoFormFieldName]: string }) => {
    changeUserInfo(token!, data)
      .then(() => {
        setSuccess(true);
        setNewEmail(data.email != userInfo.email ? data.email : '');
        setFormError('');
        dispatch(setUserInfo(data));
      })
      .catch((error) => {
        setFormError(error.response.data.detail);
        setSuccess(false);
      });
  };

  const inputs = userInfo.id ? (
    <>
      <InputBlock>
        <InputLabelStyled>Username</InputLabelStyled>
        <InputStyled
          defaultValue={userInfo.username}
          type="text"
          {...register('username', {
            required: true,
            pattern: {
              value: /[a-zA-Z0-9]([._-](?![._-])|[a-zA-Z0-9]){3,18}[a-zA-Z0-9]/,
              message: 'Provide a valid username.',
            },
          })}
        />
        {errors.username && <FieldErrorStyled>{errors.username.message}</FieldErrorStyled>}
      </InputBlock>

      <InputBlock>
        <InputLabelStyled>Email</InputLabelStyled>
        <InputStyled
          defaultValue={userInfo.email}
          type="email"
          {...register('email', {
            required: true,
            pattern: { value: /.+@.+\..+/, message: 'Provide a valid email.' },
          })}
        />
        {errors.email && <FieldErrorStyled>{errors.email.message}</FieldErrorStyled>}
      </InputBlock>

      <InputBlock>
        <InputLabelStyled>Role</InputLabelStyled>
        <InputStyled
          defaultValue={userInfo.role}
          type="text"
          {...register('role', { required: true, maxLength: 64 })}
        />
        {errors.role && <FieldErrorStyled>{errors.role.message}</FieldErrorStyled>}
      </InputBlock>
    </>
  ) : (
    <>Loading...</>
  );
  return (
    <SettingsFormStyled onSubmit={handleSubmit(submit as () => void)}>
      {inputs}
      {formError && <FormErrorStyled>{formError}</FormErrorStyled>}
      {success && <FormSuccessStyled>Data has been updated!</FormSuccessStyled>}
      {newEmail && (
        <FootnoteStyled>
          To confirm an email change, follow the instructions sent to {newEmail}
        </FootnoteStyled>
      )}

      <SubmitStyled type="submit" disabled={!isDirty || !isValid}>
        Submit
      </SubmitStyled>
    </SettingsFormStyled>
  );
};

export default UserInfoForm;
