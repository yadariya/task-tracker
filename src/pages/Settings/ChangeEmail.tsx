import { useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { BoxStyled } from '../../components/Layout/Box.styled';
import { LayoutContentsStyled } from '../../components/Layout/styled/MainLayout.styled';
import PageHeadingStyled from '../../components/Typography/PageHeading';
import { confirmEmailChange } from '../../data/api/user';
import { RootState } from '../../store/store';
import { SettingsHeaderStyled } from './styled/Settings.styled';

const ChangeEmail: React.FC = () => {
  const token = useSelector((state: RootState) => state.authentication.accessToken);
  const [searchParams] = useSearchParams();
  const confirmation = searchParams.get('token');

  let content;
  if (confirmation === null) {
    content = (
      <>
        <p>Cannot update your email.</p>
        <p>The URL does not contain a confirmation token.</p>
        <p>Make sure you followed the right link.</p>
      </>
    );
  } else {
    confirmEmailChange(token!, confirmation)
      .then(() => (content = <p>Updated your email successfully!</p>))
      .catch(
        (error) =>
          (content = (
            <>
              <p>Cannot update your email. Details:</p>
              <code>{error.response.data.detail}</code>
            </>
          )),
      );
  }

  return (
    <LayoutContentsStyled>
      <SettingsHeaderStyled>
        <PageHeadingStyled>Email change</PageHeadingStyled>
      </SettingsHeaderStyled>

      <BoxStyled>{content}</BoxStyled>
    </LayoutContentsStyled>
  );
};

export default ChangeEmail;
