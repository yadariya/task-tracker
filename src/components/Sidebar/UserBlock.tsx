import React from 'react';
import { Link } from 'react-router-dom';
import LogoutIcon from '../icons/LogoutIcon';
import ProfileIcon from '../icons/ProfileIcon';
import SettingsIcon from '../icons/SettingsIcon';
import { FlexColumn, FlexRow } from '../Layout/Flexbox.styled';
import { SmallSidebarBox } from './SidebarBox';
import UserBlockStyled from './styled/UserBlock.styled';

const UserBlock: React.FC = ({ children }) => (
  <UserBlockStyled>
    <FlexColumn gap="1em">
      <SmallSidebarBox>
        <Link to="/settings">
          <FlexRow gap="0.2em" justify="space-between" align="center">
            <ProfileIcon />
            <div className="username">@username</div>
            <SettingsIcon />
          </FlexRow>
        </Link>
      </SmallSidebarBox>
      <SmallSidebarBox>
        <Link to="/logout">
          <FlexRow gap="0.2em" justify="space-between" align="center">
            <div>Log out</div>
            <LogoutIcon />
          </FlexRow>
        </Link>
      </SmallSidebarBox>
    </FlexColumn>
  </UserBlockStyled>
);

export default UserBlock;
