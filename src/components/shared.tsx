import React from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
    background: red;
    border: 1px solid darkred;
    border-radius: 5px;

    color: white;
    
    padding: 5px;
    margin: 5px;
    max-height: 30px;
    max-width: fit-content;
`;

export const LoadingIndicator = () => {
    return (
        <div>
            Loading...
        </div>
    );
}

export const Error: React.FunctionComponent<{ message: string }> = ({ message}) => (
    <ErrorWrapper>
        {message}
    </ErrorWrapper>
)

export const Wrapper = styled.div`
    margin-left: 20px;
`;

export const ActionButton = styled.button`
    border-radius: 5px;
    border: 2px solid #8ad0ff;
    padding: 10px;
    background: #e0f3ff;
    margin-bottom: 10px;
    cursor: pointer;

    margin-right: 10px;

    &:disabled {
        background: #dbdbdb;
    }
`;

export const ActionWrapper = styled.div`
    display: flex;
    flex-direction: row;
`;