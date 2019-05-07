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