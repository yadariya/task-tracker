import React from 'react';
import { SmallTransparentBoxStyled } from '../Layout/Box.styled';

export const SidebarBox: React.FC = ({ children }) => (
  <SmallTransparentBoxStyled opacity="0.7">{children}</SmallTransparentBoxStyled>
);
