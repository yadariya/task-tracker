import React from 'react';
import { BoxStyled } from '../../components/Layout/Box.styled';
import PageHeadingStyled from '../../components/Typography/PageHeading';
import { SettingsHeaderStyled, LayoutContentsStyledBoxes } from './styled/Settings.styled';
import UserInfoForm from '../../components/forms/settings/UserInfoForm';
import PasswordChangeForm from '../../components/forms/settings/PasswordChangeForm';

const Settings: React.FC = () => {
  return (
    <LayoutContentsStyledBoxes>
      <SettingsHeaderStyled>
        <PageHeadingStyled>Settings</PageHeadingStyled>
      </SettingsHeaderStyled>

      <BoxStyled>
        <UserInfoForm />
      </BoxStyled>

      <BoxStyled>
        <PasswordChangeForm />
      </BoxStyled>
    </LayoutContentsStyledBoxes>
  );
};

export default Settings;
