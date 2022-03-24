import styled from 'styled-components';

export const InputStyled = styled.input`
    border: 1px solid #808080;
    border-radius: 10px;
    padding: 8px;
    width: 100%;
    height: 40px;
`;

export const InputLabelStyled = styled.label`
    font-weight: 500;
    font-size: 12px;
    line-height: 20px;
    color: #808080;
`;

export const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

export const InputerrorStyled = styled.h5`
    font-size: 11px;
    color: red;
    padding: 0;
    margin: 0;
    font-weight: 400;
    height: 10px;
`;

export const TextAreaStyled = styled.textarea`
    border: 1px solid #808080;
    border-radius: 10px;
    padding: 8px;
    max-width: 100%;
    min-width: 100%;
`;

export const LoginInputStyled = styled.input`
    border: 0.15em solid rgba(0, 0, 0, 0.5);
    color: #000;
    background-color: transparent;
    border-radius: 0.5em;
    padding: 1em;
    width: 100%;
    height: 40px;
    font-size: 1em;

    &:disabled {
        background-color: rgba(0, 0, 0, 0.3);
        color: rgba(0, 0, 0, 0.7);
    }
`;
