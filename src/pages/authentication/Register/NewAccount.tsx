import { TransparentBoxStyled } from '../../../components/Layout/Box.styled';
import NewAccountForm from '../../../components/forms/auth/NewAccountForm';
import { useSearchParams } from 'react-router-dom';

const NewAccount: React.FC = () => {
  const [searchParams] = useSearchParams();
  return (
    <TransparentBoxStyled>
      <NewAccountForm confirmation={searchParams.get('token')} />
    </TransparentBoxStyled>
  );
};

export default NewAccount;
