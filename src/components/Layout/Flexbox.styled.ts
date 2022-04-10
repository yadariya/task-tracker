import styled from 'styled-components';

interface FlexBoxProps {
  gap?: string;
  justify?: string;
  align?: string;
  height?: string;
  width?: string;
  textAlign?: string;
}

export const FlexColumn = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: column;
  gap: ${(p) => p.gap ?? 'initial'};
  align-items: ${(p) => p.align ?? 'normal'};
  justify-content: ${(p) => p.justify ?? 'normal'};
  width: ${(p) => p.width ?? 'initial'};
  height: ${(p) => p.height ?? 'initial'};
  text-align: ${(p) => p.textAlign ?? 'initial'};
`;

export const FlexRow = styled.div<FlexBoxProps>`
  display: flex;
  flex-direction: row;
  gap: ${(p) => p.gap ?? 'initial'};
  align-items: ${(p) => p.align ?? 'normal'};
  justify-content: ${(p) => p.justify ?? 'normal'};
  width: ${(p) => p.width ?? 'initial'};
  height: ${(p) => p.height ?? 'initial'};
  text-align: ${(p) => p.textAlign ?? 'initial'};
`;
