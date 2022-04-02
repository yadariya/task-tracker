import styled from 'styled-components';

export const TodosTableStyled = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  row-gap: 10px;
  margin-top: 20px;
`;

export const TodosTableRowStyled = styled.div`
  display: grid;
  grid-template-columns: 3fr 9fr 6fr 6fr 1fr 1fr;
  padding: 0 15px;
`;

export const TodosHeadingRowStyled = styled(TodosTableRowStyled)`
  background-color: white;
  border-bottom: 1px solid #eeeeee;
`;

export const TodosHeaderCellStyled = styled.div`
  font-size: 20px;
  color: #8e8f93;
`;

export const TodosRowStyled = styled(TodosTableRowStyled)`
  background-color: #f4f4f4;
  padding: 10px 15px;
`;

export const TodosCellStyled = styled.div`
  font-size: 20px;
  color: #000;
  display: flex;
  align-items: center;
`;

export const IconCellStyled = styled(TodosCellStyled)`
  & svg {
    cursor: pointer;
  }
`;

export const TodosControlsStyled = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
