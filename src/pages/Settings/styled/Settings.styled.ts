import styled from 'styled-components';
import { ButtonStyled } from '../../../components/Form/Button';
import { LayoutContentsStyled } from '../../../components/Layout/styled/MainLayout.styled';

export const SettingsHeaderStyled = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`;

export const FormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'username'
    'email'
    'role'
    'submit';
  column-gap: 15px;
`;

export const FormStyledPassword = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    'oldpassword'
    'newpassword'
    'reset';
  column-gap: 15px;
`;

export const SubmitStyled = styled(ButtonStyled)`
  justify-self: center;
  width: 130px;
  margin-top: 30px;
`;


export const LayoutContentsStyledBoxes = styled(LayoutContentsStyled)`
  gap: 30px;
  margin-bottom: 100px;
`;
