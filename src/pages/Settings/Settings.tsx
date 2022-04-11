/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  InputStyled,
  InputLabelStyled,
  InputBlock,
  InputerrorStyled,
} from '../../components/Form/Input';
import { BoxStyled } from '../../components/Layout/Box.styled';
import PageHeadingStyled from '../../components/Typography/PageHeading';
import {
  FormStyled,
  FormStyledPassword,
  SubmitStyled,
  SettingsHeaderStyled,
  LayoutContentsStyledBoxes,
} from './styled/Settings.styled';
import { RootState } from '../../store/store';

interface UserInfo {
  email: string;
  username: string;
  role: string;
  id: string;
}

const Settings: React.FC = () => {
  const dispatch = useDispatch();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const accessToken = useSelector((state: RootState) => state.authentication.accessToken);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm();

  useEffect(() => {
    fetch(`${process.env.API_ROOT}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((info) => setUserInfo(info));
  }, []);

  const submit = (data: any) => {
    //dispatch(patchUser(data)); // TODO
  };
  const reset = (data: any) => {
    //dispatch(resetPassword(data)); // TODO
  };

  return (
    <LayoutContentsStyledBoxes>
      <SettingsHeaderStyled>
        <PageHeadingStyled>Settings</PageHeadingStyled>
      </SettingsHeaderStyled>

      <BoxStyled>
        <FormStyled onSubmit={handleSubmit(submit)}>
          <InputBlock style={{ gridArea: 'username' }}>
            <InputLabelStyled>Name</InputLabelStyled>
            <InputStyled
              placeholder={userInfo?.username}
              type="text"
              {...register('username', { required: true })}
            />
          </InputBlock>

          <InputBlock style={{ gridArea: 'email' }}>
            <InputLabelStyled>Email</InputLabelStyled>
            <InputStyled
              placeholder={userInfo?.email}
              type="text"
              {...register('email', { required: true })}
            />
          </InputBlock>

          <InputBlock style={{ gridArea: 'role' }}>
            <InputLabelStyled>Role</InputLabelStyled>
            <InputStyled
              placeholder={userInfo?.role}
              type="text"
              {...register('role', { required: true })}
            />
          </InputBlock>

          <SubmitStyled
            style={{ gridArea: 'submit' }}
            type="submit"
            disabled={!isDirty || !isValid}
          >
            Submit
          </SubmitStyled>
        </FormStyled>
      </BoxStyled>

      <BoxStyled>
        <FormStyledPassword onSubmit={handleSubmit(reset)}>
          <InputBlock style={{ gridArea: 'oldpassword' }}>
            <InputLabelStyled>Old password</InputLabelStyled>
            <InputStyled type="text" {...register('oldpassword', { required: true })} />
          </InputBlock>
          <InputBlock style={{ gridArea: 'newpassword' }}>
            <InputLabelStyled>New password</InputLabelStyled>
            <InputStyled type="text" {...register('newpassword', { required: true })} />
          </InputBlock>
          <SubmitStyled style={{ gridArea: 'reset' }} type="reset" disabled={!isDirty || !isValid}>
            Reset
          </SubmitStyled>
        </FormStyledPassword>
      </BoxStyled>
    </LayoutContentsStyledBoxes>
  );
};

export default Settings;
