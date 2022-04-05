import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import SidebarLink from '../Sidebar/SidebarLink';
import { LayoutContentsWrapperStyled, LayoutWrapperStyled } from './styled/MainLayout.styled';

const MainLayout: React.FC = ({ children }) => (
  <LayoutWrapperStyled>
    <Sidebar>
      <SidebarLink to="/">Tasks</SidebarLink>
    </Sidebar>
    <LayoutContentsWrapperStyled>{children}</LayoutContentsWrapperStyled>
  </LayoutWrapperStyled>
);

export default MainLayout;
