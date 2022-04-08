import LoginForm from '../../../components/forms/auth/LoginForm';
import { TransparentBoxStyled } from '../../../components/Layout/Box.styled';

const Login: React.FC = () => (
  <TransparentBoxStyled>
    <LoginForm />
  </TransparentBoxStyled>
);

export default Login;
