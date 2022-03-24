import React from 'react';
import { CenteredColumn } from './CenteredColumn.styled';
import { BigLogo } from '../Logo/Logo';
import { LayoutWrapperStyled } from './styled/LoginLayout.styled';

const LoginLayout: React.FC = ({ children }) => (
  <LayoutWrapperStyled>
    <CenteredColumn gap="2em">
      <BigLogo/>
      {children}
    </CenteredColumn>
  </LayoutWrapperStyled>
);

export default LoginLayout;
