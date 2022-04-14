import styled from 'styled-components';
import { ButtonStyled } from '../../../Form/Button';

export const SettingsFormStyled = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  row-gap: 30px;
  grid-template-rows: auto;
  column-gap: 15px;
`;

export const FootnoteStyled = styled.p`
  text-align: center;
  margin: 0.1em;
  font-size: 0.7em;
  font-weight: 500;
`;

export const FieldErrorStyled = styled(FootnoteStyled)`
  color: #f00;
`;

export const FormFootnoteStyled = styled(FootnoteStyled)`
  grid-column-start: 1;
  grid-column-end: -1;
`;

export const FormErrorStyled = styled(FormFootnoteStyled)`
  color: #f00;
`;

export const FormSuccessStyled = styled(FormFootnoteStyled)`
  color: #0a0;
`;

export const SubmitStyled = styled(ButtonStyled)`
  justify-self: center;
  grid-column-start: 1;
  grid-column-end: -1;
  width: 130px;
`;
