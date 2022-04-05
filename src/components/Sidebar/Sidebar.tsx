import React from 'react';
import { Logo } from '../Logo/Logo';
import { FlexColumn } from '../Layout/Flexbox.styled';
import { SidebarWrapperStyled } from './styled/Sidebar.styled';
import UserBlock from './UserBlock';

const Sidebar: React.FC = ({ children }) => (
  <SidebarWrapperStyled>
    <FlexColumn justify="space-between" height="100%">
      <FlexColumn gap="1em">
        <Logo />
        {children}
      </FlexColumn>
      <UserBlock />
    </FlexColumn>
  </SidebarWrapperStyled>
);

export default Sidebar;
