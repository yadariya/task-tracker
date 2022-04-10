import styled from 'styled-components';

interface ColoredLogoIcon {
  fill: string;
}

export const LogoIconWrapper = styled.div<ColoredLogoIcon>`
  display: flex;
  height: 0.8em;
  width: 0.8em;

  & > svg {
    fill: ${(p) => p.fill};
    width: 100%;
    height: 100%;
  }
`;

export const LogoWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 0.2em;
  align-items: center;
`;
