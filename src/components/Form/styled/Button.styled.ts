import styled from 'styled-components';

export const ButtonStyled = styled.button`
  height: 35px;
  min-width: 100px;
  background-color: #4925e9;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;

  &:disabled {
    background-color: rgba(73, 37, 233, 0.5);
    cursor: not-allowed;
  }
`;

export const LoginButtonStyled = styled.button`
  padding: 0.75em 1.5em;
  background-color: #4925e9;
  text-transform: uppercase;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: 1em;

  &:disabled {
    background-color: rgba(73, 37, 233, 0.5);
    cursor: not-allowed;
  }
`;
