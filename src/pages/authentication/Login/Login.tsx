import { useNavigate } from 'react-router-dom';
import LoginForm from '../../../components/forms/LoginForm';
import { TransparentBoxStyled } from '../../../components/Layout/Box.styled';

export default function Login() {
    return (
        <TransparentBoxStyled>
            <LoginForm navigate={useNavigate()} />
        </TransparentBoxStyled>
    );
}
