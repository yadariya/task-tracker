import React from 'react';
import {
  LayoutContentsWrapperStyled,
  LayoutWrapperStyled,
  SidebarStyled,
} from './styled/MainLayout.styled';

const MainLayout: React.FC = ({ children }) => (
  <LayoutWrapperStyled>
    <SidebarStyled />
    <LayoutContentsWrapperStyled>{children}</LayoutContentsWrapperStyled>
  </LayoutWrapperStyled>
);

export default MainLayout;
