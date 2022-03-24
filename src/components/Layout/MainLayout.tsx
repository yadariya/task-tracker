import React from 'react';
import {
    LayoutContentsStyled,
    LayoutWrapperStyled,
    SidebarStyled,
} from './styled/MainLayout.styled';

const MainLayout: React.FC = ({ children }) => (
    <LayoutWrapperStyled>
        <SidebarStyled />
        <LayoutContentsStyled>{children}</LayoutContentsStyled>
    </LayoutWrapperStyled>
);

export default MainLayout;
