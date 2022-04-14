import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { BoxStyled } from '../../components/Layout/Box.styled';
import { LayoutContentsStyled } from '../../components/Layout/styled/MainLayout.styled';
import CodeLine from '../../components/Typography/CodeLine';
import PageHeadingStyled from '../../components/Typography/PageHeading';
import { confirmEmailChange } from '../../data/api/user';
import { RootState } from '../../store/store';
import { SettingsHeaderStyled } from './styled/Settings.styled';

const ChangeEmail: React.FC = () => {
  const [error, setError] = useState('');
  const token = useSelector((state: RootState) => state.authentication.accessToken);
  const [searchParams] = useSearchParams();
  const confirmation = searchParams.get('token');

  if (confirmation) {
    confirmEmailChange(token!, confirmation).catch((error) =>
      setError(error.response?.data.detail || 'An unknown error occured.'),
    );
  }

  return (
    <LayoutContentsStyled>
      <SettingsHeaderStyled>
        <PageHeadingStyled>Email change</PageHeadingStyled>
      </SettingsHeaderStyled>

      <BoxStyled>
        {confirmation === null && (
          <>
            <p>Cannot update your email.</p>
            <p>The URL does not contain a confirmation token.</p>
            <p>Make sure you followed the right link.</p>
          </>
        )}
        {error ? (
          <>
            <p>Cannot update your email.</p>
            <p>
              Details: <CodeLine>{error}</CodeLine>
            </p>
          </>
        ) : (
          <p>Updated your email successfully!</p>
        )}
      </BoxStyled>
    </LayoutContentsStyled>
  );
};

export default ChangeEmail;
