import React from 'react';
import { LogoFont, BigLogoFont } from './styled/LogoFont.styled';
import LogoIcon from './LogoIcon';
import { LogoIconWrapper, LogoWrapper } from './styled/Logo.styled';

export const Logo: React.FC = () => (
  <LogoFont>
    <LogoWrapper>
      <LogoIconWrapper fill="#fff">
        <LogoIcon />
      </LogoIconWrapper>
      <div>TaskTracker</div>
    </LogoWrapper>
  </LogoFont>
);

export const BigLogo: React.FC = () => (
  <BigLogoFont>
    <LogoWrapper>
      <LogoIconWrapper fill="#000">
        <LogoIcon />
      </LogoIconWrapper>
      <div>TaskTracker</div>
    </LogoWrapper>
  </BigLogoFont>
);
