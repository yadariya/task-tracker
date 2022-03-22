import React from 'react';
import { LandingContentsStyled, LandingWrapperStyled, SidebarStyled } from './styled/Landing.styled';

const Landing: React.FC = ({ children }) => (
  <LandingWrapperStyled>
    <SidebarStyled />
    <LandingContentsStyled>{children}</LandingContentsStyled>
  </LandingWrapperStyled>
);

export default Landing;
