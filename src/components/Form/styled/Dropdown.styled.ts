import styled from 'styled-components';

export const DropdownStyled = styled.div`
  position: relative;
  border: 1px solid #808080;
  border-radius: 10px;
  padding: 8px;
  width: 100%;
  height: 40px;
  user-select: none;
`;

export const DropdownListStyled = styled.fieldset`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin: 0;
  padding: 0;
  border: 1px solid #808080;
  border-radius: 10px;
  background: #fff;

  display: flex;
  flex-direction: column;
  z-index: 1;
`;

export const DropdownListItemStyled = styled.label`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3em;
  padding: 0.2em 0.5em;
`;

export const DropdownListTickStyled = styled.input`
  height: 1.5em;
  width: 1.5em;
  margin: 0;
`;
