import styled from 'styled-components';

const ButtonStyled = styled.button`
  height: 35px;
  min-width: 100px;
  background-color: #4925E9;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;

  &:disabled {
    background-color: rgba(73, 37, 233, 0.5);
    cursor: not-allowed;
  }
`;

export default ButtonStyled;
