import styled from 'styled-components';
import { ButtonStyled } from '../../../components/Form/Button';

export const TodoFormWrapperStyled = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const TodoFormHeaderStyled = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-between;
`;

export const FormStyled = styled.form`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: auto;
    grid-template-areas:
        'title deadline tag'
        'description description description'
        '. submit .';
    column-gap: 15px;
`;

export const SubmitStyled = styled(ButtonStyled)`
    justify-self: center;
    width: 130px;
    margin-top: 50px;
`;
