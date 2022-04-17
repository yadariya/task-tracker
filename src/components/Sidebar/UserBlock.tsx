import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../data/api/user';
import { setUserInfo } from '../../data/slices/user/userInfoSlice';
import { RootState } from '../../store/store';
import LogoutIcon from '../icons/LogoutIcon';
import ProfileIcon from '../icons/ProfileIcon';
import SettingsIcon from '../icons/SettingsIcon';
import { FlexColumn, FlexRow } from '../Layout/Flexbox.styled';
import { SidebarBox } from './SidebarBox';
import UserBlockStyled from './styled/UserBlock.styled';
import UserInfoColumn from './UserInfoColumn';

const UserBlock: React.FC = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state: RootState) => state.userInfo);
  const token = useSelector((state: RootState) => state.authentication.accessToken);

  useEffect(() => {
    if (!userInfo.id) {
      getUserInfo(token!).then((user) => dispatch(setUserInfo(user)));
    }
  }, []);

  return (
    <UserBlockStyled>
      <FlexColumn gap="1em">
        <SidebarBox>
          <Link to="/settings">
            <FlexRow gap="0.4em" justify="space-between" align="center">
              <ProfileIcon />
              <UserInfoColumn nickname={userInfo.username} role={userInfo.role} />
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
