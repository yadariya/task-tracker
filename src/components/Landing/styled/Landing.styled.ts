import styled from 'styled-components';

export const LandingWrapperStyled = styled.div`
  box-sizing: border-box;
  height: 100%;
`;

export const SidebarStyled = styled.div`
  height: 100%;
  width: 284px;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #4623E9, #EAABF0);
  overflow-x: hidden;
  padding-top: 20px;
`;

export const LandingContentsStyled = styled.div`
  margin-left: 284px;
  padding: 0;
  padding-top: 100px;
  overflow-y: scroll;
  height: 100%;
  background-color: #E1E6FA;
`;
