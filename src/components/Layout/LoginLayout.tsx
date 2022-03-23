import React from 'react';
import { CenteredColumn } from './CenteredColumn.styled';
import { BigLogo } from '../Logo/Logo';
import { LandingWrapperStyled } from '../Layout/styled/LoginLanding.styled';

const LoginLanding: React.FC = ({ children }) => (
  <LandingWrapperStyled>
    <CenteredColumn gap="2em">
      <BigLogo/>
      {children}
    </CenteredColumn>
  </LandingWrapperStyled>
);

export default LoginLanding;
