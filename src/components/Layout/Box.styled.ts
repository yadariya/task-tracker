import styled from 'styled-components';

interface TransparentBox {
  opacity?: string;
}

interface ConfigurableWidthBox {
  width?: string;
}

export const BoxStyled = styled.div<ConfigurableWidthBox>`
  width: ${(p) => p.width ?? '80%'};
  background-color: #fff;
  padding: 20px;
  border-radius: 7px;
`;

export const TransparentBoxStyled = styled.div<TransparentBox>`
  background-color: rgba(255, 255, 255, ${(p) => p.opacity ?? '0.3'});
  padding: 1em;
  border-radius: 1em;
`;

export const SmallTransparentBoxStyled = styled.div<TransparentBox>`
  background-color: rgba(255, 255, 255, ${(p) => p.opacity ?? '0.3'});
  padding: 0.5em;
  border-radius: 0.5em;
`;
