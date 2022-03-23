import React from 'react';
import { LandingContentsStyled, LandingWrapperStyled, SidebarStyled } from './styled/MainLanding.styled';

const MainLanding: React.FC = ({ children }) => (
  <LandingWrapperStyled>
    <SidebarStyled />
    <LandingContentsStyled>{children}</LandingContentsStyled>
  </LandingWrapperStyled>
);

export default MainLanding;
