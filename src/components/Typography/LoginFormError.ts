import styled from 'styled-components';
import LoginFormFootnote from './LoginFormFootnote';

const LoginFormError = styled(LoginFormFootnote)`
    color: #f00;
    font-style: italic;
    
    & a {
        color: #f00;
    }
`;

export default LoginFormError;
