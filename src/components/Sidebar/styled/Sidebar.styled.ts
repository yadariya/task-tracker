import styled from 'styled-components';

export const SidebarWrapperStyled = styled.div`
  height: 100%;
  min-width: 12em;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background: linear-gradient(180deg, #4623e9, #eaabf0);
  overflow-x: hidden;
  padding: 1em;

  & a {
    color: inherit;
    text-decoration: none;
  }
`;