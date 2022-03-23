import styled from "styled-components";

interface ColumnProps {
  gap: string;
}

export const CenteredColumn = styled.div<ColumnProps>`
  display: flex;
  gap: ${p => p.gap};
  flex-direction: column;
  align-items: center;
`;