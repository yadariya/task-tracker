import styled from 'styled-components';

export const LayoutWrapperStyled = styled.div`
    box-sizing: border-box;
    font-size: 1.2em;
    min-height: 100%;
`;

export const SidebarStyled = styled.div`
    height: 100%;
    width: 284px;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    background: linear-gradient(180deg, #4623e9, #eaabf0);
    overflow-x: hidden;
    padding-top: 20px;
`;

export const LayoutContentsStyled = styled.div`
    margin-left: 284px;
    padding: 0;
    padding-top: 100px;
    overflow-y: scroll;
    height: 100%;
    background-color: #e1e6fa;
`;
