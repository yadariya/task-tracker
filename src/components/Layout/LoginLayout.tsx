import React from 'react';
import { FlexColumn } from './Flexbox.styled';
import { BigLogo } from '../Logo/Logo';
import { LayoutWrapperStyled } from './styled/LoginLayout.styled';

const LoginLayout: React.FC = ({ children }) => (
  <LayoutWrapperStyled>
    <FlexColumn gap="2em" align="center">
      <BigLogo />
      {children}
    </FlexColumn>
  </LayoutWrapperStyled>
);

export default LoginLayout;
