import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '../icons/ArrowIcon';
import { FlexRow } from '../Layout/Flexbox.styled';
import { SidebarBox } from './SidebarBox';

interface CustomLinkProps {
  to: string;
}

class SidebarLink extends React.Component<CustomLinkProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <Link to={this.props.to}>
        <SidebarBox>
          <FlexRow justify="space-between" align="center">
            {this.props.children}
            <ArrowRightIcon />
          </FlexRow>
        </SidebarBox>
      </Link>
    );
  }
}

export default SidebarLink;
