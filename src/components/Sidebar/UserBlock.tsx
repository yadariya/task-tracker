import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from '../../store/store';
import LogoutIcon from '../icons/LogoutIcon';
import ProfileIcon from '../icons/ProfileIcon';
import SettingsIcon from '../icons/SettingsIcon';
import { FlexColumn, FlexRow } from '../Layout/Flexbox.styled';
import { SidebarBox } from './SidebarBox';
import UserBlockStyled from './styled/UserBlock.styled';
import UserInfoColumn from './UserInfoColumn';

interface UserInfo {
  email: string;
  username: string;
  role: string;
  id: string;
}

const UserBlock: React.FC = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const accessToken = useSelector((state: RootState) => state.authentication.accessToken);

  useEffect(() => {
    fetch(`${process.env.API_ROOT}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((info) => setUserInfo(info));
  }, []);

  return (
    <UserBlockStyled>
      <FlexColumn gap="1em">
        <SidebarBox>
          <Link to="/settings">
            <FlexRow gap="0.4em" justify="space-between" align="center">
              <ProfileIcon />
              <UserInfoColumn nickname={userInfo?.username} role={userInfo?.role} />
              <SettingsIcon />
            </FlexRow>
          </Link>
        </SidebarBox>
        <SidebarBox>
          <Link to="/logout">
            <FlexRow gap="0.4em" justify="space-between" align="center">
              <div>Log out</div>
              <LogoutIcon />
            </FlexRow>
          </Link>
        </SidebarBox>
      </FlexColumn>
    </UserBlockStyled>
  );
};

export default UserBlock;
