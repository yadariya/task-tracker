import React from 'react';
import { SmallTransparentBoxStyled, TransparentBoxStyled } from '../Layout/Box.styled';

export const SidebarBox: React.FC = ({ children }) => (
  <TransparentBoxStyled opacity="0.7">{children}</TransparentBoxStyled>
);

export const SmallSidebarBox: React.FC = ({ children }) => (
  <SmallTransparentBoxStyled opacity="0.7">{children}</SmallTransparentBoxStyled>
);
