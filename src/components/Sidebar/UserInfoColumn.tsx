import React from 'react';
import { FlexColumn } from '../Layout/Flexbox.styled';
import UserInfoColumnStyled from './styled/UserInfoColumn.styled';

interface UserInfoProps {
  nickname?: string;
  role?: string;
}

class UserInfoColumn extends React.Component<UserInfoProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const roleDiv = <div>{this.props.role}</div>;
    return (
      <UserInfoColumnStyled>
        <FlexColumn>
          <div>{this.props.nickname ?? 'Loading...'}</div>
          {this.props.role ? roleDiv : ''}
        </FlexColumn>
      </UserInfoColumnStyled>
    );
  }
}

export default UserInfoColumn;
