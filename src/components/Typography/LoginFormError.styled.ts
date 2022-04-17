import styled from 'styled-components';
import LoginFormFootnote from './LoginFormFootnote.styled';

const LoginFormErrorStyled = styled(LoginFormFootnote)`
  color: #f00;
  font-style: italic;

  & a {
    color: #f00;
  }
`;

export default LoginFormErrorStyled;
