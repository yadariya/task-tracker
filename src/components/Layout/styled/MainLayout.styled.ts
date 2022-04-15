import styled from 'styled-components';

export const LayoutWrapperStyled = styled.div`
  box-sizing: border-box;
  font-size: 1.2em;
  height: 100%;
  display: grid;
  grid-template-columns: min-content auto;
`;

export const LayoutContentsWrapperStyled = styled.div`
  padding: 100px 0;
  overflow-y: scroll;
  height: 100%;
  background-color: #e1e6fa;
`;

export const LayoutContentsStyled = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
