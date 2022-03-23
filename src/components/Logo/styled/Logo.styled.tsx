import styled from 'styled-components';
import svgIcon from '../../../assets/icon.svg';

export const LogoWrapper = styled.div`
  &:before {
    content: url(${svgIcon});
    vertical-align: middle;
    padding-right: 0.2em;
  }
`;